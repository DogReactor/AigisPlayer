ipcrender.on('login', (event, message) => {
  var login_id = document.getElementById('login_id');
  var password = document.getElementById('password');
  if (login_id != undefined && password != undefined) {
    var form = login_id.parentNode.parentNode;
    login_id.value = message.username;
    password.value = message.password;
    var btn = form[7];
    if (btn.type !== 'submit') {
      btn = form[5];
    }
    setTimeout(function () {
      btn.click();
    }, 1000);
  } else {
    ipcrender.sendToHost('loginerror');
  }
  //document.getElementById
})
