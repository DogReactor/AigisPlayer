'use strict';

const electron = require('electron');
const http = require('http');
const path = require('path');
const ipcMain = electron.ipcMain;
const fs = require('fs');
const proxyServer = require('./backend/proxyServer.js');
const fileList = require('./backend/fileList.js');
const request = require('request');
const {dialog} = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const session = require('electron').session;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('user-data-dir');

//chrome指令
try{
  let settingjson = fs.readFileSync('config.conf');
  let setting = JSON.parse(settingjson);
  if(setting.disableAccelerated == true) {
    app.commandLine.appendSwitch('disable-accelerated-2d-canvas');
    console.log('disable-Accelerated')
  }
}
catch(e){

}

//代理服务器
try{
  fs.mkdirSync('cache');
}
catch(e){

}
  proxyServer.createServer();

//electron-app
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 960,
      height: 512,
      frame:false,
      "node-integration": "iframe",
      "web-preferences": {
        "web-security": false
      },
      maximizable:false,
      resizable:false,
      title:"AigisPlayer"
    });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  console.log('file://' + __dirname + '/index.html');
  // Open the DevTools.
  
  //mainWindow.webContents.openDevTools();
  
  //mainWindow.setMenu(null);
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.exit();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function(){
  createWindow();
  //设置代理
  const filter = {
    urls: ['http://assets.millennium-war.net/*']
  };
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    let url = details.url;
    let path = url.replace("http://assets.millennium-war.net/","")
    if(path.indexOf('1fp32igvpoxnb521p9dqypak5cal0xv0') !== -1) console.log(path);
    for(let i in fileList){
      if(path == fileList[i].path && (fileList[i].fileName == "pcev03.aar" || fileList[i].fileName == "prev03.aar")) console.log(fileList[i]);
    }
    //console.log(assetList[path]);
    url = "http://127.0.0.1:19980/" + path;
    let exist = false;
    try{
      exist = fs.statSync("cache/"+path).isFile();
    }
    catch(e){
      exist = false;
    }
    if(exist){
      //console.log('CacheExist Redirect to cacheServer ',path);
      callback({cancel:false,redirectURL:url});
    }
    else{
      callback({cancel:false});
    }
  });
  // 版本更新检测
  let appPath = app.getAppPath();
  let version = JSON.parse(fs.readFileSync(appPath + '/package.json','utf-8')).version;
  request('http://aigis.hloli.moe:9980/version',(err,res,body)=>{
    if(body === undefined) return;
    let v = JSON.parse(body);
    if (v.normal != version) {
      dialog.showMessageBox({
        type:'info',
        buttons:[],
        title:'检测到新版本',
        message:'有新版本啦！\n\n新版本：普通版 ' + v.normal +'\n\n更新内容为:' + v.normalDetail
      });
    }
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});