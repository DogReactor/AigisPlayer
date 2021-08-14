const { ipcRenderer, remote } = require('electron');
window.prompt = (message, text) => {
  return ipcRenderer.sendSync('prompt', message, text);
};