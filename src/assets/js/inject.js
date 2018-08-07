global.ipcrender = require('electron').ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;
global.ArrayBuffer = Buffer;

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
require('./loadModule');
