import { app, BrowserWindow, screen, session, ipcMain } from 'electron';
import * as path from 'path';
import { ProxyServer } from './src/backend/proxyServer'
import * as fs from 'fs';
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as url from 'url';

let fileList = [];
if (serve) {
  require('electron-reload')(__dirname, {
  });
}
/*app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('user-data-dir');
app.commandLine.appendSwitch('allow-cross-origin-auth-prompt');
app.commandLine.appendSwitch('flag-switches-begin');
app.commandLine.appendSwitch('enable-experimental-web-platform-features ');
app.commandLine.appendSwitch('flag-switches-end');
*/
const proxyServer = new ProxyServer();
proxyServer.createServer();

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 960,
    height: 694,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/index.html'),
    slashes: true
  }));
  // Open the DevTools.
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
    // weila
    const protoablePath = process.env.PORTABLE_EXECUTABLE_DIR;
    const modPath = protoablePath ? protoablePath + '/extensions' : './extensions';
    if (!fs.existsSync(modPath)) {
      fs.mkdirSync(modPath);
    }
    const virapath = path.join(modPath, 'viramate');
    if (fs.existsSync(virapath)) {
      const extensionName = BrowserWindow.addExtension(path.join(__dirname, './assets/viramate'));
      console.log(extensionName);
    }
    createWindow();
    const filter = {
      urls: ['http://assets.millennium-war.net/*']
    };
    session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
      let url = details.url;
      const urlpath = url.replace('http://assets.millennium-war.net', '')
      let fileName = fileList[urlpath];
      if (urlpath.indexOf('595d57bf1216f3887cb69205494eb744') !== -1) {
        fileName = 'MainFont.aft';
      }
      if (fileName === undefined) {
        callback({ cancel: false });
        return;
      }
      url = 'http://127.0.0.1:19980' + urlpath;
      callback({ cancel: false, redirectURL: url });
    });
    ipcMain.on('fileList', (event, arg) => {
      fileList = arg;
      proxyServer.setFileList(fileList);
    });
    ipcMain.on('proxyStatusUpdate', (Event, arg) => {
      proxyServer.setProxy(arg.Enabled, arg.Socks5, arg.Host, arg.Port);
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
