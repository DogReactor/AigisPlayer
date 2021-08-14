const { ipcRenderer, remote } = require('electron');
remote.app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
// require('./loadModule');
require('./prompt');

// window.require = undefined;
window.exports = undefined;
window.module = undefined;
