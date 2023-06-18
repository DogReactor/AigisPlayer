const { ipcRenderer } = require('electron');

require('./pluginHelper');
require('./fixPage');
require('./autoLogin');
// require('./loadModule');
require('./prompt');

// window.require = undefined;
window.exports = undefined;
window.module = undefined;

console.log('preload script injected');