require('./pluginHelper');
global.ipcrenderer = require('electron').ipcRenderer;

ipcrenderer.on('plugin-info', (sender, message) => {
    const pluginHelper = new PluginHelper();
    pluginHelper.plugin = message;
    run(pluginHelper);
})