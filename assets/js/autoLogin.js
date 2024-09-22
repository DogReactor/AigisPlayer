const { ipcRenderer, remote } = require('electron');

ipcRenderer.on('login', (event, message) => {
  var login_id = document.getElementById('login_id');
  var password = document.getElementById('password');
  if (login_id != undefined && password != undefined) {
    var form = login_id.parentNode.parentNode.parentNode;
    const event = new Event('input', { bubbles: true });
    login_id.value = message.username;
    password.value = message.password;
    login_id.dispatchEvent(event);
    password.dispatchEvent(event);
    var btn = form[5];
    if (btn.type !== 'submit') {
      btn = form[5];
    }
    setTimeout(function () {
      btn.click();
    }, 1000);
  } else {
    ipcRenderer.sendToHost('loginerror');
  }
  //document.getElementById
})
