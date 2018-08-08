global.ipcrender = require('electron').ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
require('./loadModule');
