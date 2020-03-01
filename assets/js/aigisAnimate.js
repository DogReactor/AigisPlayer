var targetCanvas = document.createElement('canvas');
targetCanvas.isCustomedCanvas = true;
// ↓临时测试
targetCanvas.width = 1024;
targetCanvas.height = 1024;
var ctx = targetCanvas.getContext('2d');
ctx.fillStyle = 'red';
var width = 150;
var direction = 1;
var id = -1;
// call FileList
var fileList = {};

var electron = require('electron');
var urlLib = require('url');
var pathLib = require('path');
var fs = require('fs');
require('./gifuct-js');
var basePath = pathLib.join(electron.remote.app.getPath('userData'), 'mods');
electron.remote.ipcMain.on('fileList', (_, arg) => {
  fileList = arg;
});

var frameCount = 0;
var frameList = [];
var meta;
var jump = false;
draw = () => {
  if (!jump) {
    jump = true;
  } else {
    jump = false;
    id = requestAnimationFrame(draw);
    return;
  }
  ctx.clearRect(0, 0, meta.height, meta.width);

  frameCount = frameCount % frameList.length;
  var frame = frameList[frameCount];
  if (meta.type === 'gif') {
    var frameImageData = ctx.createImageData(frame.dims.width, frame.dims.height);
    frameImageData.data.set(frame.patch);
    ctx.putImageData(frameImageData, meta.x, meta.y);
  } else {
    var img = new Image();
    img.src = frame;
    ctx.drawImage(img, meta.x, meta.y);
  }

  frameCount++;
  id = requestAnimationFrame(draw);
};

loadAnimate = url => {
  var urlObj = urlLib.parse(url);
  var path = urlObj.path;
  var fileName = fileList[path];
  if (!fileName) {
    return null;
  }
  // 根据文件名寻找文件
  var fileNameWithoutExt = fileName.split('.')[0];
  var filePath = pathLib.join(basePath, fileNameWithoutExt);
  var metaPath = pathLib.join(filePath, 'meta.json');
  var framesPath = pathLib.join(filePath, 'frames');
  if (!fs.existsSync(filePath) && !fs.existsSync(metaPath) && !fs.existsSync(framesPath)) {
    console.log('no such files', fileName);
    return null;
  }
  try {
    var metaJSON = fs.readFileSync(metaPath, { encoding: 'utf8' });
    meta = JSON.parse(metaJSON);
    if (meta.type === 'gif') {
      framesPath = pathLib.join(filePath, 'ani.gif');
      var gifBuffer = fs.readFileSync(framesPath);
      var gif = new GIF(gifBuffer);
      frameList = gif.decompressFrames(true);
    } else {
      frameList = fs.readdirSync(framesPath).map(v => {
        var framePath = pathLib.join(framesPath, v);
        var frameBase64 = fs.readFileSync(framePath).toString('base64');
        var frameURI = 'data:image/png;base64,' + frameBase64;
        return frameURI;
      });
    }
    // 停止没有停止的动画
    if (id != -1) {
      cancelAnimationFrame(id);
      id = -1;
    }
    // 准备就绪，开始渲染
    console.log('start');
    frameCount = 0;
    targetCanvas.height = meta.height;
    targetCanvas.width = meta.width;
    id = requestAnimationFrame(draw);
    return targetCanvas;
  } catch {
    return null;
  }
};

stopAnimate = () => {
  console.log('stopeed');
  cancelAnimationFrame(id);
  frameList = [];
  id = -1;
};
