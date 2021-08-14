import { Injectable } from '@angular/core';
import { Size } from './util';
import { ElMessageService } from 'element-angular';
import { TranslateService } from '@ngx-translate/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as fs from 'fs';
import { ipcRenderer, BrowserWindow, app, Session, Clipboard, clipboard, Tray } from 'electron';
import * as Electron from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  currentWindow: BrowserWindow;
  APP: typeof app;
  Session: typeof Session;
  fs: typeof fs;
  serve: boolean;
  electron: typeof Electron;
  clipboard: Clipboard;
  Tray: typeof Tray;
  ipcMain: typeof Electron.ipcMain;
  require: typeof Electron.remote.require;
  remote: typeof Electron.remote;
  constructor(private message: ElMessageService, private translateService: TranslateService) {
    // Conditional imports
    if (this.isElectron()) {
      this.electron = window.require('electron');
      this.require = require('@electron/remote').require;
      this.ipcRenderer = this.electron.ipcRenderer;
      this.childProcess = window.require('child_process');
      this.currentWindow = require('@electron/remote').getCurrentWindow();
      this.APP = require('@electron/remote').app;
      this.Session = require('@electron/remote').require('electron').session;
      this.fs = window.require('fs');
      this.serve = require('@electron/remote').process.argv.slice(1).some(val => val === '--serve');
      this.clipboard = require('@electron/remote').clipboard;
      this.Tray = require('@electron/remote').Tray;
      this.ipcMain = require('@electron/remote').ipcMain;
      global['currentWindow'] = this.currentWindow;
      this.ipcRenderer.send('Hello', 'Hello');
      this.remote = require('@electron/remote');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  };

  ReSize = (size: Size) => {
    // What the fuck;
    this.currentWindow.resizable = true;
    this.currentWindow.setSize(size.Width, size.Height + 54, true);
    this.currentWindow.resizable = false;
  };

  FlashFrame() {
    if (!this.currentWindow.isFocused()) {
      this.currentWindow.once('focus', () => {
        this.currentWindow.flashFrame(false);
      });
      this.currentWindow.flashFrame(true);
    }
  }

  async ClearCache() {
    await this.Session.fromPartition('persist:request').clearCache();
    await this.Session.fromPartition('persist:game').clearCache();
    this.translateService.get('MESSAGE.CLEARCACHE-SUCCESS').subscribe(res => {
      this.message['success'](res);
    });
  }
  CreateBrowserWindow = (url, option) => {
    const win = new this.electron.remote.BrowserWindow(option);
    win.loadURL(url);
    return win;
  };
  Restart() {
    this.APP.relaunch();
    this.APP.exit(0);
  }
  CheckForUpdate(callback) {
    ipcRenderer.on('update-message', (sender, text, obj) => {
      switch (text) {
        case 'UPDATE.CHECK':
          this.message['warning']('检查新版本中');
          break;
        case 'UPDATE.AVB':
          this.message['warning']('检查到新版本，下载中...');
          break;
        case 'UPDATE.NOTAVB':
          this.message['success']('现在是最新版本');
          break;
        case 'UPDATE.ERROR':
          this.message['error']('检查更新时发生错误');
          break;
        case 'UPDATE.PROGRESS':
          break;
        case 'UPDATE.DOWNLOADED':
          callback(true);
          break;
      }
    });
    ipcRenderer.send('checkForUpdates');
  }
  UpdateNow() {
    ipcRenderer.send('updateNow');
  }
}
