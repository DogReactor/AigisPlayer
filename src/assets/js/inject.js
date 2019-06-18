window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
const remote = require('electron').remote;
remote.app.commandLine.appendSwitch("js-flags", "--max-old-space-size=8192");

global.ipcrender = require('electron').ipcRenderer;
global.consoleLog = console.log;
global.consoleError = console.error;

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
require('./loadModule');
