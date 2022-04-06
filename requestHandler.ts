import * as stream from 'stream';
import { session, net, app, ipcMain, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs';
import * as Config from 'electron-store';
import * as log from 'electron-log';
import { parseAL, AL } from 'aigis-fuel';
const config = new Config();
export class Rule {
  public Url: Array<string>;
  public Method: string;
  public Request: boolean;
  public Callback: (url: string, response, request?: any) => void;
  constructor(
    options: { url: string[]; method?: string; request?: any },
    callback: (url: string, response, request?: any) => void
  ) {
    this.Url = options.url;
    this.Method = options.method || 'ALL';
    this.Request = options.request || false;
    this.Callback = callback;
  }
  match(url: string, method: string) {
    function checkUrl(value: string) {
      if (url.indexOf(value) !== -1) {
        return true;
      } else {
        return false;
      }
    }
    if (this.Url.find(checkUrl) && (this.Method === 'ALL' || this.Method === method)) {
      return true;
    }
    return null;
  }
}
let subscription: Array<Rule> = [];
let FileList = {};
let mainFontPath = config.get('fontPath');
let browserWindow: BrowserWindow;
export class RequestHandler {
  static setFileList(fileList) {
    FileList = fileList;
  }
  static setFontPath(path: string) {
    mainFontPath = path;
  }
  static Clear() {
    subscription = [];
  }
  static setWin(win) {
    browserWindow = win;
  }
  static Subscribe(
    options: { url: Array<string>; method?: string; request?: boolean },
    callback: (url: string, response, request?: any) => void
  ) {
    subscription.push(new Rule(options, callback));
  }
  static async handleData(req, cb) {
    // 处理回复用函数
    function handleResponse(raw: Buffer, readable: stream.PassThrough, rule: Rule) {
      if (!ModifyFilePath) {
        // 直接回传
        readable.pause();
        readable.push(null);
        readable.resume();
      } else {
        // 魔改文件热封装
        const result = parseAL(raw);
        const packaged = result.Package(ModifyFilePath);
        readable.push(packaged);
        readable.pause();
        readable.push(null);
        readable.resume();
      }
      if (rule) {
        const _res = raw;
        const _req = req.uploadData ? req.uploadData[0].bytes : null;
        rule.Callback(req.url, _res, _req);
      }
    }

    // 获取发起请求用session
    const requestSession = session.fromPartition('persist:game', { cache: true });
    if (browserWindow) {
      browserWindow.webContents.send('request-incoming');
    }
    // 检查该请求是否订阅
    const rule = subscription.find(value => value.match(req.url, req.method));
    // 创建可读取流
    const readable = new stream.PassThrough();
    // 判断是否需要进行魔改
    let ModifyFilePath = '';
    if (req.url.indexOf('://drc1bk94f7rq8.cloudfront.net/') !== -1) {
      let modifyFileName = '';
      const reqPath = url.parse(req.url).path;
      let requestFileName = FileList[reqPath];
      if (reqPath.indexOf(mainFontPath) !== -1) {
        requestFileName = 'MainFont.aft';
      }
      if (requestFileName) {
        switch (path.extname(requestFileName)) {
          case '.atb':
            modifyFileName = requestFileName.replace('.atb', '.txt');
            break;
          case '.aar':
            modifyFileName = requestFileName.replace('.aar', '');
            break;
          default:
            modifyFileName = requestFileName;
        }
      }
      const protoablePath = process.env.PORTABLE_EXECUTABLE_DIR;
      const userDataPath = app.getPath('userData');
      const modPath = protoablePath ? protoablePath + '/mods' : path.join(userDataPath, 'mods');
      if (!fs.existsSync(modPath)) {
        fs.mkdirSync(modPath);
      }
      const modifyFilePath = path.join(modPath, modifyFileName);
      if (modifyFileName !== '' && fs.existsSync(modifyFilePath)) {
        log.info(requestFileName, 'modify by Server');
        // AFT和PNG文件直接回传
        // 同名文件直接回传
        if (fs.existsSync(path.join(modPath, requestFileName))) {
          const fileStream = fs.createReadStream(modifyFilePath);
          cb({
            statusCode: 200,
            data: readable
          });
          fileStream.on('data', chunk => {
            readable.push(chunk);
          });
          fileStream.on('end', () => {
            readable.pause();
            readable.push(null);
            readable.resume();
          });
          return;
        }
        // 其他文件
        ModifyFilePath = modifyFilePath;
      }
    }
    // 创建请求
    const request = net.request({
      method: req.method,
      url: req.url,
      session: requestSession,
      useSessionCookies: true
      // redirect: 'manual'
    });
    // 允许分片
    // request.chunkedEncoding = true;
    // 写Header
    if (req.referrer) {
      request.setHeader('Referer', req.referrer);
    }
    Object.keys(req.headers).forEach(key => {
      request.setHeader(key, req.headers[key]);
    });
    // request.setHeader('If-None-Match', " ");
    // 上传数据
    if (req.uploadData) {
      req.uploadData.forEach(v => {
        if (v.bytes) {
          request.write(v.bytes);
        }
      });
    }
    // 处理请求
    request.on('response', response => {
      const raws: Array<Buffer> = [];
      let length = 0;
      let time = 10;
      const timeout = setTimeout(() => {
        time--;
        if (time === 0) {
          console.log(req.url, 'Time out');
        }
      }, 1000);
      cb({
        statusCode: response.statusCode,
        headers: response.headers,
        data: readable
      });
      response.on('data', chunk => {
        time = 10;
        if (!ModifyFilePath) {
          readable.push(chunk);
        }
        if (rule || ModifyFilePath) {
          raws.push(chunk);
        }
        length += chunk.byteLength;
      });
      response.on('end', () => {
        clearTimeout(timeout);
        const raw = raws.length !== 0 ? Buffer.concat(raws) : null;
        if (response.statusCode !== 200) {
          // 直接回传
          readable.pause();
          readable.push(null);
          readable.resume();
        }
        handleResponse(raw, readable, rule);
      });
      response.on('error', err => {
        clearTimeout(timeout);
        readable.push(null);
        log.error(req.url, err, response.statusCode);
      });
    });
    // 处理错误
    request.on('error', err => {
      log.error(req.url, err);
    });
    request.end();
  }
}
