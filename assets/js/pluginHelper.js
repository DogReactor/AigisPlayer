const crypto = require('crypto');
class PluginHelper {
  constructor() {
    this.ipcRenderer = require('electron').ipcRenderer;
  }
  onMessage(callback) {
    const channel = `${this.plugin.id}`;
    this.ipcRenderer.on(channel, (event, msg) => {
      console.log('get Message From Guest', msg.type, msg);
      const salt = msg.salt;
      const message = msg.message;
      const sendResponse = (message) => {
        if (typeof message === 'object') {
          message = JSON.parse(JSON.stringify(message));
        }
        const channel = `${this.plugin.id}-${salt}`;
        event.sender.send(channel, message);
      }
      callback(message, sendResponse);
    });
  }
  sendMessage(message, callback) {
    const sendChannel = `${this.plugin.id}`;
    const salt = crypto.createHash("md5").update(Math.random().toString()).digest("hex");
    const obj = {
      salt: salt,
      message: message
    }

    const replyChannel = `${this.plugin.id}-${salt}`;
    if (callback) {
      this.ipcRenderer.once(replyChannel, (event, message) => {
        callback(message);
      });
    }

    this.ipcRenderer.send(sendChannel, obj);
  }
  sendMessageSync(message) {
    const channel = `${this.plugin.id}-sync`
    return this.ipcRenderer.sendSync(channel, message);
  }
  createWindow(file, option) {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const currentWindow = require('electron').remote.getCurrentWindow();
    const path = require('path');
    const url = require('url').format({
      protocol: 'file',
      slashes: true,
      pathname: file
    });
    if (!option['webPreferences']) {
      option['webPreferences'] = {}
    }
    option['webPreferences']['preload'] = path.join(__dirname, 'pluginWindowPreload.js');
    option.parent = currentWindow;
    const win = new BrowserWindow(option);
    win.loadURL(url);
    win.webContents.on('dom-ready', (event) => {
      event.sender.send('plugin-info', this.plugin);
    });
    return win;
  }
}

global['PluginHelper'] = PluginHelper;
