ipcrender.on('catch', (event, message) => {
    console.log = consoleLog;
    // GBF
    if (window.location.href.indexOf('game.granbluefantasy.jp') !== -1) {
        require('./gbf/fixSlideBar');
    }
    var gameFrame = document.getElementById('game_frame');
    if (gameFrame === null) ipcrender.sendToHost('url', 'error');
    else {
        gameFrame.style.position = 'fixed';
        document.body.style.overflow = "hidden";
        if (message === "kamihime") {
            gameFrame.style.top = '-28px';
            gameFrame.style.left = '-150px';
            gameFrame.style.zIndex = '25';
        } else {
            gameFrame.style.top = '0';
            gameFrame.style.left = '0';
            gameFrame.style.zIndex = '25';
            gameFrame.style.marginLeft = '-5px';
        }
    }
});

ipcrender.on('change', (event, message) => {
    document.getElementById('content').style.position = 'fixed';
    ipcrender.sendToHost('changesuccess');
});