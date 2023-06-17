import { app, BrowserWindow, session, ipcMain, Menu, protocol } from 'electron';
import * as path from 'path';
import { RequestHandler } from './requestHandler';
let win: BrowserWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as log from 'electron-log';
import * as unzip from 'unzipper';
import * as request from 'request';
import * as Config from 'electron-store';
import * as url from 'url';
import { autoUpdater } from 'electron-updater';
import * as remoteMain from '@electron/remote/main';
const config = new Config();

require('@electron/remote/main').initialize()

// app.commandLine.appendSwitch('--enable-npapi');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');
app.commandLine.appendSwitch('lang', 'ja-jp')
// app.commandLine.appendSwitch('ignore-certificate-errors');
if (config.get('disable-hardware-acceleration')) {
  app.disableHardwareAcceleration();
}

autoUpdater.logger = log;
autoUpdater.autoInstallOnAppQuit = false;
log.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text, obj?) {
  log.info(text, obj);
  win.webContents.send('update-message', text, obj);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('UPDATE.CHECK');
});
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('UPDATE.AVB');
});
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('UPDATE.NOTAVB');
});
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('UPDATE.ERROR');
});
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('UPDATE.PROGRESS', progressObj);
});
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('UPDATE.DOWNLOADED');
  ipcMain.once('updateNow', (e, arg) => {
    autoUpdater.quitAndInstall();
  });
});

let fileList = {};

function createWindow() {
  win = new BrowserWindow({
    width: 960,
    height: 694,
    frame: false,
    resizable: false,
    transparent: true,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      plugins: true,
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      partition: 'persist:main',
    }
  });
  remoteMain.enable(win.webContents);
  RequestHandler.setWin(win);
  // and load the index.html of the app.
  if (serve) {
    // require('electron-reload')(__dirname, {
    //   electron: require(`${__dirname}/node_modules/electron`)
    // });
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
  win.webContents.on('render-process-gone', (e, details) => {
    console.log('render-process-gone', details);
  });
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
    const gameSession = session.fromPartition('persist:game', { cache: true });
    app['RequestHandler'] = RequestHandler;
    app['dirname'] = __dirname;
    const filterData = [
      'https://millennium-war.net/*',
      'https://all.millennium-war.net/*',
      'https://drc1bk94f7rq8.cloudfront.net/*',
      'http://millennium-war.net/*',
      'http://all.millennium-war.net/*'
    ];
    // 统计
    gameSession.webRequest.onCompleted({ urls: ['http://*/*', 'https://*/*'] }, () => {
      if (win) {
        win.webContents.send('response-incoming');
      }
    });
    // TODO: 筛掉Aborted的请求
    gameSession.webRequest.onErrorOccurred(({ url, error }) => {
      if (win) {
        win.webContents.send('error-incoming', url, error);
      }
    });

    // gameSession.webRequest.onBeforeSendHeaders({
    //   urls: [
    //     'https://*.dmm.com/*',
    //     'https://*.dmm.co.jp/*',
    //     'http://*.dmm.com/*',
    //     'http://*.dmm.co.jp/*'
    //   ]
    // }, (details, callback) => {
    //   console.log(details.url);
    //   details.requestHeaders['X-Forwarded-For'] = '45.14.106.61';
    //   callback({ requestHeaders: details.requestHeaders });
    // })

    // 游戏数据的拦截
    // 自定义协议的注册
    gameSession.protocol.registerStreamProtocol('http', RequestHandler.handleData);
    gameSession.protocol.registerStreamProtocol('https', RequestHandler.handleData);
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
      const requestSession = session.fromPartition('persist:request', { cache: true });
      const gameSession = session.fromPartition('persist:game', { cache: true });
      const rule = {
        proxyRules: proxyRule,
        proxyBypassRules: '127.0.0.1 player.pigtv.moe',
        pacScript: ''
      };
      gameSession.setProxy(rule);
      requestSession.setProxy(rule);
      // proxyServer.setProxy(arg.Enabled, arg.Socks5, arg.Host, arg.Port);
    });

    ipcMain.on('checkForUpdates', () => {
      autoUpdater.setFeedURL('http://player.pigtv.moe/assets/aigisplayer');
      autoUpdater.checkForUpdates();
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

    ipcMain.on('prompt', (event, message, text) => {
      let promptResponse = null;
      let promptWindow = new BrowserWindow({
        width: 350,
        height: 120,
        show: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInSubFrames: true,
          webviewTag: true
        }
      });
      const html = `
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
        </head>
        <body>
          <div>${message}</div>
          <input type="text" id="inputbox" value="${text}" style="width:100%"/>
          <div style="margin-top: 10px;">
            <button style="float:right" onclick="ok()">OK</button>
            <button style="float:right;margin-right: 10px;" onclick="cancel()">Cancel</button>
          </div>
          <script>
          const ipcRenderer = require('electron').ipcRenderer;
          const inputbox = document.getElementById('inputbox');
          function cancel(){
            ipcRenderer.send('prompt-response','',true);
            window.close();
          }
          function ok(){
            ipcRenderer.send('prompt-response',inputbox.value,false);
            window.close();
          }
        </script>
        </body>
      </html>
      `;
      promptWindow.loadURL('data:text/html,' + html);
      promptWindow.show();
      ipcMain.on('prompt-response', function (event, value, cancel) {
        if (cancel) {
          value = null;
        }
        promptResponse = value;
      });
      promptWindow.on('close', () => {
        promptWindow = null;
        event.returnValue = promptResponse;
      });
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    win = null;
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
process.on('unhandledRejection', (reason, promise) => {
  console.error(`Uncaught error in`, promise);
});
