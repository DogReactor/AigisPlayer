window.prompt = (message, text) => {
  return require('electron').ipcRenderer.sendSync('prompt', message, text);
};