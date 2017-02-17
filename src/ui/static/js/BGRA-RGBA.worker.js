onmessage = function(event){
    let frame = event.data;
    let v = frame;
    let frameBuffer = v.frameBuffer;
    //convert To RGBA
    for(let i = 0;i<frameBuffer.length;i += 4){
        //i:B i+1:G i+2:R i+3:A
        let B = frameBuffer[i];
        frameBuffer[i] = frameBuffer[i+2];
        frameBuffer[i+2] = B;
    }
    let imgData = new ImageData(Uint8ClampedArray.from(frameBuffer),v.width,v.height);
    postMessage(imgData);
}