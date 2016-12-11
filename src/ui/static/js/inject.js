const ipcrender = require('electron').ipcRenderer;
ipcrender.on('catch',(event,message)=>{
	var gameFrame = document.getElementById('game_frame');
    if(gameFrame == null) ipcrender.sendToHost('url','error');
    else{
        gameFrame.style.position = 'fixed';
        gameFrame.style.top = '0';
        gameFrame.style.left = '0';
        gameFrame.style.zIndex = '25';
        gameFrame.style.marginLeft = '-5px';
    }
});
ipcrender.on('change',(event,message)=>{
	document.getElementById('content').style.position = 'fixed';
	ipcrender.sendToHost('changesuccess');
});
ipcrender.on('login',(event,message)=>{
    var login_id = document.getElementById('login_id');
    var password = document.getElementById('password');
    if(login_id != undefined && password != undefined){
        var form = login_id.parentNode.parentNode;
        login_id.value = message.username;
        password.value = message.password;
        setTimeout(function(){form[7].click();},1000);
    }
    else{
        ipcrender.sendToHost('loginerror');
    }
    //document.getElementById
})  