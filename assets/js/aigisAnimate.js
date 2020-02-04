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
var basePath = pathLib.join(electron.remote.app.getPath('userData'), 'mods');
electron.remote.ipcMain.on('fileList', (_, arg) => {
  fileList = arg;
});

var frameCount = 0;
var frameList = [];
var meta;
draw = () => {
  if (frameCount >= frameList.length) {
    frameCount = 0;
  }
  var frame = frameList[frameCount];
  var img = new Image();
  img.src = frame;
  ctx.clearRect(0, 0, meta.height, meta.width);
  ctx.drawImage(img, meta.x, meta.y);
  id = requestAnimationFrame(draw);
  frameCount++;
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
    console.log('no such files');
    return null;
  }
  try {
    var metaJSON = fs.readFileSync(metaPath, { encoding: 'utf8' });
    frameList = fs.readdirSync(framesPath).map(v => {
      var framePath = pathLib.join(framesPath, v);
      var frameBase64 = fs.readFileSync(framePath).toString('base64');
      var frameURI = 'data:image/png;base64,' + frameBase64;
      return frameURI;
    });
    meta = JSON.parse(metaJSON);
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
  id = -1;
};
