'use strict';

const electron = require('electron');
const http = require('http');
const path = require('path');
const ipcMain = electron.ipcMain;
const fs = require('fs');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const session = require('electron').session;
const request = require('request');
const dialog = require('electron').dialog;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


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

//electron-app
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 970, height: 512,frame:false,maximizable:false,resizable:false,title:"AigisPlayer"});

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
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function(){
  createWindow();
  try{
    let apppath = app.getAppPath();
    let version = JSON.parse(fs.readFileSync(apppath + '/package.json','utf8')).version;
    // 获取版本信息
    request('http://aigis.hloli.moe:9980/version',function(err,res,body){
      console.log(version);
      let v = JSON.parse(body);
      if(v.green != version){
        dialog.showMessageBox({
          buttons:[],
          type:'info',
          title:'新版本提示',
          message:'有新版本发布了！\n\n新版本：AigisPlayer绿色版' + v.green + '\n\n更新说明：' + v.greenDetail
        });
      }
    });
  }
  catch(e){
    console.log(e);
  }

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