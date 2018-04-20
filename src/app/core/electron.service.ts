import { Injectable } from '@angular/core';
import { Size } from './util'
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
  Session: Session;
  fs: typeof fs;
  serve: boolean;
  electron: typeof Electron;
  clipboard: Clipboard;
  Tray: typeof Tray;
  ipcMain: typeof Electron.ipcMain
  constructor(
    private message: ElMessageService,
    private translateService: TranslateService
  ) {
    // Conditional imports
    if (this.isElectron()) {
      this.electron = window.require('electron');
      this.ipcRenderer = this.electron.ipcRenderer;
      this.childProcess = window.require('child_process');
      this.currentWindow = this.electron.remote.getCurrentWindow();
      this.APP = this.electron.remote.app;
      this.Session = this.electron.remote.require('electron').session.defaultSession;
      this.fs = window.require('fs');
      this.serve = this.electron.remote.process.argv.slice(1).some(val => val === '--serve');
      this.clipboard = this.electron.remote.clipboard;
      this.Tray = this.electron.remote.Tray;
      this.ipcMain = this.electron.remote.ipcMain;
      console.log('serve', this.serve);

      this.ipcRenderer.send('Hello', 'Hello');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  ReSize = (size: Size) => {
    this.currentWindow.setSize(size.Width, size.Height + 54);
  }

  SetProxy = (address: string) => {
    this.Session.setProxy({
      proxyRules: address,
      proxyBypassRules: '127.0.0.1',
      pacScript: ''
    }, () => {
      // console.log('success');
    })
  }
  ClearCache() {
    this.Session.clearCache(() => {
      this.translateService.get('MESSAGE.CLEARCACHE-SUCCESS').subscribe(res => {
        this.message['success'](res)
      });
    });
  }
  CreateBrowserWindow = (url, option) => {
    const win = new this.electron.remote.BrowserWindow(option);
    win.loadURL(url);
    return win;
  }
}
