const { ipcRenderer, remote } = window.require('electron');
remote.app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');

global.ipcrender = ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;
window.nodeRequire = window.require;

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
require('./loadModule');
require('./prompt');

window.require = undefined;
window.exports = undefined;
window.module = undefined;
