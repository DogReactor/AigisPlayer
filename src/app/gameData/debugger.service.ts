import { Injectable } from '@angular/core';
import { WebContents, webContents } from 'electron';
import { ElectronService } from '../core/electron.service';
import { RequestHandler } from '../../../build/requestHandler';

@Injectable()
export class DebuggerService {
  requestHandler: typeof RequestHandler;
  constructor(private electronService: ElectronService) {
    this.requestHandler = this.electronService.APP['RequestHandler'] as (typeof RequestHandler);
    this.requestHandler.Clear();
  }
  Subscribe(
    options: { url: Array<string>; method?: string; request?: boolean },
    callback: (url: string, response, request?: any) => void
  ) {
    this.requestHandler.Subscribe(options, callback);
  }
}
