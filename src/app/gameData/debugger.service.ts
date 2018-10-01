import { Injectable } from '@angular/core'
import { WebContents } from 'electron';
import { ElectronService } from '../core/electron.service';

class Rule {
    public Url: Array<string>;
    public Method: string;
    public Request: boolean;
    public Callback: (url: string, response, request?: boolean) => void;
    constructor(
        options: { url: string[], method?: string, request?: boolean },
        callback: (url: string, response, request?: boolean) => void
    ) {
        this.Url = options.url;
        this.Method = options.method || 'ALL';
        this.Request = options.request || false;
        this.Callback = callback;
    }
    match(url: string, method: string) {
        function checkUrl(value: string) {
            if (url.indexOf(value) !== -1) { return true; } else { return false; }
        }
        if (this.Url.find(checkUrl) && (this.Method === 'ALL' || this.Method === method)) { return true }
        return null;
    }
}

@Injectable()
export class DebuggerService {
    private reqMaps: Map<string, { url: string, rule: Rule }> = null;
    private subscription: Array<Rule> = [];
    constructor(
        private electronService: ElectronService
    ) {
    }
    Subscribe(
        options: { url: Array<string>, method?: string, request?: boolean },
        callback: (url: string, response, request?: boolean) => void
    ) {
        this.subscription.push(new Rule(options, callback));
    }
    Attach = (webContents: WebContents) => {
        try {
            webContents.debugger.attach('1.1');
            webContents.debugger.on('detach', (event, reason) => {
                console.log('Debugger detached due to : ', reason);
            });
            /*webContents.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
                enabled: true
            });*/
            webContents.debugger.on('message', (event, method, params) => {
                switch (method) {
                    case 'Network.requestWillBeSent':
                        const rule = this.subscription.find((value) => {
                            return value.match(params.request.url, params.request.method);
                        })
                        if (rule) {
                            if (rule.Request === true) {
                                const raw = params.request.postData;
                                const arr = [];
                                for (let i = 0; i < raw.length; i++) {
                                    arr.push(raw.charCodeAt(i));
                                }
                                const buffer = Buffer.from(arr);
                                rule.Callback(params.request.url, buffer, true);
                            }
                            this.reqMaps.set(params.requestId, {
                                url: params.request.url,
                                rule: rule
                            });
                        }

                        break;
                    case 'Network.loadingFinished':
                        // 处理response
                        if (this.reqMaps.has(params.requestId)) {
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                'requestId': params.requestId
                            }, (err, response) => {
                                const o = this.reqMaps.get(params.requestId);
                                o.rule.Callback(o.url, response, false);
                            });
                        }
                        break;
                }
            });
            this.reqMaps = new Map();
            webContents.debugger.sendCommand('Network.enable');
        } catch (err) {
            console.log('Debugger attach failed : ', err);
        }
    };

    Detach = (webContents: WebContents) => {
        webContents.debugger.detach();
        this.reqMaps = null;
    }
}
