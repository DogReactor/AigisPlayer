import { Injectable } from '@angular/core';
import { Size } from './util'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as fs from 'fs';
import { ipcRenderer, BrowserWindow, app, Session } from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  currentWindow: BrowserWindow;
  APP: typeof app;
  Session: Session;
  fs: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
      this.currentWindow = window.require('electron').remote.getCurrentWindow();
      this.APP = window.require('electron').remote.app;
      this.Session = window.require('electron').remote.require('electron').session.defaultSession;
      this.fs = window.require('fs');
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
}
