global.ipcrender = require('electron').ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;

require('./pluginWindowPreload');
require('./fixPage');
require('./autoLogin');
require('./loadModule');