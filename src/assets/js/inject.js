const { ipcRenderer, remote } = window.require('electron');
remote.app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');

global.ipcrender = ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
require('./loadModule');
