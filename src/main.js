'use strict';

const electron = require('electron');
const http = require('http');
const path = require('path');
const ipcMain = electron.ipcMain;
const fs = require('fs');
const proxyServer = require('./backend/proxyServer.js');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const {session} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


//chrome指令
app.commandLine.appendSwitch('disable-accelerated-2d-canvas');
app.commandLine.appendArgument('disable-web-security');
//app.commandLine.appendSwitch('user-data-dir','/userdata');


/*var proxyjson = fs.readFileSync('proxy.conf');
try{
	var proxy = JSON.parse(proxyjson);
	if(proxy.address != "" && proxy.port != "")
		app.commandLine.appendSwitch('proxy-server',proxy.address + ":" + proxy.port);
}
catch(e){
	
}*/

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
  mainWindow = new BrowserWindow({width: 970, height: 512,frame:false,maximizable:false,resizable:false,title:"AigisPlayer",icon:"main.ico"});

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
  //设置代理
  const filter = {
    urls: ['http://assets.millennium-war.net/*']
  };
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    let url = details.url;
    //console.log(url);
    let path = url.replace("http://assets.millennium-war.net/","")
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
