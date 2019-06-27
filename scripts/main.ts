import { app, BrowserWindow, session, ipcMain, Menu } from 'electron';
import * as path from 'path';
import { ProxyServer } from './proxyServer';
let win: BrowserWindow, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');
const autoUpdater = require('electron-updater').autoUpdater;
import * as log from 'electron-log';
import * as unzip from 'unzipper';
import * as request from 'request';
import * as Config from 'electron-config';
const config = new Config();

// app.commandLine.appendSwitch('--enable-npapi');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');
// app.commandLine.appendSwitch('ignore-certificate-errors');
if (config.get('disable-hardware-acceleration')) {
  app.disableHardwareAcceleration();
}

autoUpdater.logger = log;
autoUpdater.autoInstallOnAppQuit = false;
log.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text, obj?) {
  log.info(text);
  win.webContents.send('update-message', text, obj);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('UPDATE.CHECK');
});
autoUpdater.on('update-available', () => {
  sendStatusToWindow('UPDATE.AVB');
});
autoUpdater.on('update-not-available', () => {
  sendStatusToWindow('UPDATE.NOTAVB');
});
autoUpdater.on('error', () => {
  sendStatusToWindow('UPDATE.ERROR');
});
autoUpdater.on('download-progress', (_, progressObj) => {
  sendStatusToWindow('UPDATE.PROGRESS', progressObj);
});
autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('UPDATE.DOWNLOADED');
  ipcMain.once('updateNow', () => {
    autoUpdater.quitAndInstall();
  });
});

let fileList = {};
if (serve) {
  require('electron-reload')(path.join(process.cwd(), 'src'), {
    electron: require(`${process.cwd()}/node_modules/electron`),
  });
}
const proxyServer = new ProxyServer();
proxyServer.createServer(app.getPath('userData'));
proxyServer.setFontPath(config.get('fontPath'));

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
    },
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, '/app/index.html'));
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
    createWindow();
    // menu
    if (process.platform === 'darwin') {
      // Create our menu entries so that we can use MAC shortcuts
      Menu.setApplicationMenu(
        Menu.buildFromTemplate([
          {
            label: 'Edit',
            submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { type: 'separator' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'pasteandmatchstyle' },
              { role: 'delete' },
              { role: 'selectall' },
            ],
          },
        ]),
      );
    }
    const filter = {
      urls: ['http://assets.millennium-war.net/*'],
    };
    session.defaultSession.webRequest.onBeforeRequest(
      filter,
      (details, callback) => {
        let url = details.url;
        const urlpath = url.replace('http://assets.millennium-war.net', '');
        let fileName = fileList[urlpath];
        if (urlpath.indexOf(config.get('fontPath')) !== -1) {
          fileName = 'MainFont.aft';
        }
        if (fileName === undefined) {
          callback({ cancel: false });
          return;
        }
        url = `http://127.0.0.1:${proxyServer.Port}${urlpath}`;
        callback({ cancel: false, redirectURL: url });
      },
    );

    ipcMain.on('fileList', (_, arg) => {
      fileList = arg;
      proxyServer.setFileList(fileList);
      let fontPath = Object.keys(fileList).find((v) => {
        return fileList[v] === 'MainFont.aft';
      });
      if (!fontPath) {
        return;
      }
      fontPath = fontPath.split('/')[2];
      if (config.get('fontPath') !== fontPath) {
        config.set('fontPath', fontPath);
        proxyServer.setFontPath(fontPath);
        console.log('get new FontPath', fontPath);
      }
    });
    ipcMain.on('proxyStatusUpdate', (_, arg) => {
      proxyServer.setProxy(arg.Enabled, arg.Socks5, arg.Host, arg.Port);
    });

    ipcMain.on('checkForUpdates', () => {
      autoUpdater.setFeedURL('http://player.aigis.me/assets/aigisplayer');
      autoUpdater.checkForUpdates();
    });

    ipcMain.on('installPlugin', (_, arg) => {
      const url = arg.url;
      const pluginPath = arg.pluginPath;
      const salt = arg.salt;
      request
        .get(url)
        .on('error', (e) => {
          win.webContents.send(`plugin-install-error-${salt}`, e);
        })
        .pipe(unzip.Extract({ path: pluginPath }))
        .on('close', () => {
          win.webContents.send(`plugin-install-success-${salt}`);
        })
        .on('error', (e) => {
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
