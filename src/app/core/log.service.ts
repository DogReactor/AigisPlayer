import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
@Injectable()
export class LogService {
  private url = '';
  RequestCount = 0;
  ResponseCount = 0;
  ErrorCount = 0;
  constructor() {
    ipcRenderer.on('request-incoming', () => {
      this.RequestCount++;
    });
    ipcRenderer.on('response-incoming', () => {
      this.ResponseCount++;
    });
    ipcRenderer.on('error-incoming', (_, req, err) => {
      this.ErrorCount++;
    });
  }
  get Url() {
    return this.url;
  }
  set Url(url: string) {
    this.url = url;
    // this.RequestCount = 0;
  }
}
