const ipcrender = require('electron').ipcRenderer;

let timer = null;
let frames = [];
ipcrender.on('catch', (event, message) => {
    // GBF
    console.log(window.location.href);
    if (window.location.href.indexOf('game.granbluefantasy.jp') !== -1) {
        let platformList = ["isGree", "isDMM", "isYahoo"];

        let html = document.documentElement.outerHTML;
        let needAppend = false;
        for (let platform of platformList) {
            let pattern = new RegExp(`${platform}:\\s*function\\(\\)\\{\\s*return true;\\s*\\}`);
            if (pattern.test(html)) {
                needAppend = true;
                break;
            }
        }

        if (!needAppend) {
            return;
        }

        let prevNode;
        for (let node of document.head.children) {
            if (node.tagName === 'META' && node.name === 'apple-mobile-web-app-title') {
                prevNode = node;
            } else if (node.tagName === 'SCRIPT' && node.src === 'https://cdn-connect.mobage.jp/jssdk/mobage-menubar.2.4.2.min.js') {
                // mobage version
                return;
            }
        }

        let script = document.createElement('script');
        script.src = 'https://cdn-connect.mobage.jp/jssdk/mobage-menubar.2.4.2.min.js'; // <- the main difference between mobage and other versions
        prevNode.parentNode.insertBefore(script, prevNode.nextSibling);

        let createCss = function (css) {
            let style = document.createElement('style');
            style.innerHTML = css;
            return style;
        };

        let appendCss = function (css) {
            document.head.appendChild(createCss(css));
        };

        let css = 'div[data-menubar-container=MenuBarContainer] > nav > * { display: none; }';
        appendCss(css);
        return;
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

ipcrender.on('start-record', (event, message) => {
    console.log(window.location.host);
    console.log(document.domain);
    let canvas = undefined;
    try {
        canvas = window.frames['game_frame'].document.getElementById('aigis').contentWindow.document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        //ipcrender.sendToHost('start-record');
        if (timer !== null) clearInterval(timer);
        frames = [];
        //开始录制
        timer = setInterval(() => {
            let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            frames.push(imgData);
            console.log('添加Frames');
        }, 200);
    }
    catch (e) {
        ipcrender.sendToHost('failed-to-start-record');
        console.log('失败', e);
    }
});

ipcrender.on('stop-record', (event, message) => {
    clearInterval(timer);
    let count = 0;
    ipcrender.sendToHost('add-new-frame', frames[0]);
    //ipcrender.sendToHost('start-add-frames');
    /*console.log('start-add-frames');
    setTimeout(()=>{
        let _timer = setInterval(()=>{
            console.log(frames[count]);
            ipcrender.sendToHost('add-new-frame',frames[count]);
            console.log('add-new-frame');
            count++;
            if(count === frames.length){
                clearInterval(_timer);
                setTimeout(()=>{
                    ipcrender.sendToHost('finish-add-frames');
                    console.log('finish-add-frames');
                },1500);
            }
        },1500);
    },1500);*/

    //ipcrender.sendToHost('add-frames',frames);
});

ipcrender.on('login', (event, message) => {
    var login_id = document.getElementById('login_id');
    var password = document.getElementById('password');
    if (login_id != undefined && password != undefined) {
        var form = login_id.parentNode.parentNode;
        login_id.value = message.username;
        password.value = message.password;
        setTimeout(function () { form[7].click(); }, 1000);
    }
    else {
        ipcrender.sendToHost('loginerror');
    }
    //document.getElementById
})