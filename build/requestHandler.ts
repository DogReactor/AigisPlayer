import * as stream from 'stream';
import { session, net } from 'electron';
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
export class RequestHandler {
  static Clear() {
    subscription = [];
  }
  static Subscribe(
    options: { url: Array<string>; method?: string; request?: boolean },
    callback: (url: string, response, request?: any) => void
  ) {
    subscription.push(new Rule(options, callback));
  }
  static async handleData(req, cb) {
    const requestSession = session.fromPartition('persist:request');
    // 检查该请求是否订阅
    const rule = subscription.find(value => value.match(req.url, req.method));
    // 创建可读取流
    const readable = new stream.PassThrough();
    // 同步cookies
    const cookies = await session.defaultSession.cookies.get({
      url: req.url
    });
    cookies.forEach(cookie => {
      requestSession.cookies.set({ url: req.url, ...cookie });
    });
    // 创建请求
    const request = net.request({
      method: req.method,
      url: req.url,
      session: requestSession,
      redirect: 'manual'
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
    // 上传数据
    if (req.uploadData) {
      req.uploadData.forEach(v => {
        if (v.bytes) {
          request.write(v.bytes);
        }
      });
    }
    // 处理301 302
    request.on('redirect', (statusCode, method, redirectUrl, responseHeaders) => {
      if (
        /*  */
        responseHeaders['content-type'] &&
        responseHeaders['content-type'][0].indexOf('text/html') !== -1
      ) {
        cb({
          statusCode: 200,
          headers: responseHeaders,
          data: readable
        });
        readable.push(`
            <html>
              <head>
                <meta http-equiv="refresh" content="0; url=${redirectUrl}">
              </head>
            </html>
            `);
        readable.push(null);
      } else {
        cb({
          statusCode: statusCode,
          headers: responseHeaders
        });
      }

      // request.abort();
    });
    // 处理回复
    request.on('response', response => {
      // TODO: 魔改
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
        readable.push(chunk);
        if (rule) {
          raws.push(chunk);
        }
        length += chunk.byteLength;
      });
      response.on('end', () => {
        clearTimeout(timeout);
        // raws.forEach(raw => readable.push(raw));
        readable.pause();
        readable.push(null);
        readable.resume();
        if (rule) {
          const _res = Buffer.concat(raws);
          const _req = req.uploadData ? req.uploadData[0].bytes : null;
          rule.Callback(req.url, _res, _req);
        }
      });
      response.on('error', err => {
        clearTimeout(timeout);
        readable.push(null);
        console.log(req.url, err, response.statusCode);
      });
    });
    // 处理错误
    request.on('error', err => console.log(err));
    request.end();
  }
}
