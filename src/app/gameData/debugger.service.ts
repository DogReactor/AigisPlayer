/**
 * Translated from http://millenniumwaraigis.wikia.com/wiki/User_blog:Lzlis/Interpreting_POST_responses
 */

import { Injectable } from '@angular/core'
import { WebContents } from 'electron';
import { PluginService } from '../core/plugin.service'
import { parseAL } from './AL'
import { ElectronService } from '../core/electron.service';

const aigisURL = 'https://millennium-war.net/';
const aigisRURL = 'https://all.millennium-war.net/';
const aigisFileListPath = '2iofz514jeks1y44k7al2ostm43xj085';
const aigisRFileListPath = '1fp32igvpoxnb521p9dqypak5cal0xv0';

class Rule {
    public Url: Array<string>;
    public Method: string;
    public Callback: (url: string, response) => void;
    constructor(url: Array<string>, method: string, callback: (url: string, response) => void) {
        this.Url = url;
        this.Method = method;
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
    private fileListReq = null;
    private fileList = {};
    constructor(
        private pluginService: PluginService,
        private electronService: ElectronService
    ) {
    }
    Subscribe = (url: string | Array<string>, method, callback: (url: string, response) => void) => {
        if (typeof url === 'string') { url = [url] }
        this.subscription.push(new Rule(url, method, callback));
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
                                o.rule.Callback(o.url, response);
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
        this.fileListReq = null;
    }
}
