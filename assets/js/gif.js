let timer = null;
let frames = [];

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