import { app, BrowserWindow, session, ipcMain, Menu } from 'electron';
import * as path from 'path';
import { RequestHandler } from './requestHandler';
let win: BrowserWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as log from 'electron-log';
import * as unzip from 'unzipper';
import * as request from 'request';
import * as Config from 'electron-config';
import * as url from 'url';
const config = new Config();

// app.commandLine.appendSwitch('--enable-npapi');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');
// app.commandLine.appendSwitch('ignore-certificate-errors');
if (config.get('disable-hardware-acceleration')) {
  app.disableHardwareAcceleration();
}

log.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text, obj?) {
  log.info(text);
  win.webContents.send('update-message', text, obj);
}

let fileList = {};

function createWindow() {
  win = new BrowserWindow({
    width: 960,
    height: 694,
    frame: false,
    resizable: false,
    // transparent: true,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      plugins: true,
      nodeIntegration: true,
      webviewTag: true,
      partition: 'persist:main'
    }
  });
  RequestHandler.setWin(win);
  // and load the index.html of the app.
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'ng/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }
  // Open the DevTools.
  // win.webContents.openDevTools();
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    app['RequestHandler'] = RequestHandler;
    app['dirname'] = __dirname;
    const filterData = ['https://millennium-war.net/*', 'https://all.millennium-war.net/*'];
    const filterAssets = ['http://assets.millennium-war.net/*'];
    app['RequestFilter'] = filterData;
    const gameSession = session.fromPartition('persist:game');
    // 统计
    gameSession.webRequest.onCompleted({ urls: ['http://*/*', 'https://*/*'] }, () => {
      win.webContents.send('response-incoming');
    });
    // TODO: 筛掉Aborted的请求
    gameSession.webRequest.onErrorOccurred(({ url, error }) => {
      win.webContents.send('error-incoming', url, error);
    });
    // 游戏数据的拦截
    gameSession.webRequest.onBeforeRequest({ urls: filterData }, ({ url: u }, callback) => {
      const urlObj = url.parse(u);
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        urlObj.protocol = urlObj.protocol === 'http:' ? 'hack:' : 'hacks:';
        callback({ redirectURL: url.format(urlObj) });
        return;
      }
      callback({ cancel: false });
    });

    // 游戏资源的拦截
    // TODO: 等electron开放3rd-party cookies
    let count = 0;
    gameSession.webRequest.onBeforeRequest({ urls: filterAssets }, ({ url: u }, callback) => {
      const urlObj = url.parse(u);
      count++;
      if (count <= 2) {
        callback({ cancel: false });
      } else {
        urlObj.protocol = urlObj.protocol === 'http:' ? 'hack:' : 'hacks:';
        callback({ redirectURL: url.format(urlObj) });
      }
    });

    // 自定义协议的注册
    gameSession.protocol.registerStreamProtocol('hack', RequestHandler.handleData);
    gameSession.protocol.registerStreamProtocol('hacks', RequestHandler.handleData);
    createWindow();
    // menu
    if (process.platform === 'darwin') {
      // Create our menu entries so that we can use MAC shortcuts
      Menu.setApplicationMenu(
        Menu.buildFromTemplate([
          {
            label: 'Edit'
          }
        ])
      );
    }
    ipcMain.on('fileList', (_, arg) => {
      fileList = arg;
      RequestHandler.setFileList(fileList);
      let fontPath = Object.keys(fileList).find(v => {
        return fileList[v] === 'MainFont.aft';
      });
      if (!fontPath) {
        return;
      }
      fontPath = fontPath.split('/')[2];
      if (config.get('fontPath') !== fontPath) {
        config.set('fontPath', fontPath);
        RequestHandler.setFontPath(fontPath);
        console.log('get new FontPath', fontPath);
      }
    });
    ipcMain.on('proxyStatusUpdate', (_, proxyRule: string) => {
      const requestSession = session.fromPartition('persist:request');
      const gameSession = session.fromPartition('persist:game');
      const rule = {
        proxyRules: proxyRule,
        proxyBypassRules: '127.0.0.1 player.aigis.me',
        pacScript: ''
      };
      gameSession.setProxy(rule);
      requestSession.setProxy(rule);
      // proxyServer.setProxy(arg.Enabled, arg.Socks5, arg.Host, arg.Port);
    });

    ipcMain.on('installPlugin', (_, arg) => {
      const url = arg.url;
      const pluginPath = arg.pluginPath;
      const salt = arg.salt;
      request
        .get(url)
        .on('error', e => {
          win.webContents.send(`plugin-install-error-${salt}`, e);
        })
        .pipe(unzip.Extract({ path: pluginPath }))
        .on('close', () => {
          win.webContents.send(`plugin-install-success-${salt}`);
        })
        .on('error', e => {
          win.webContents.send(`plugin-install-error-${salt}`, e);
        });
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
