/**
 * Translated from http://millenniumwaraigis.wikia.com/wiki/User_blog:Lzlis/Interpreting_POST_responses
 */

import { Injectable } from '@angular/core';
import { DebuggerService } from '../debugger.service';
import { Decoder } from './decode'
import { Decompress } from './decompress'
import { parseAL } from 'aigis-fuel';
import { URL } from 'url';
import { Xml2json } from './xml2json';
import { Event } from './EventList';
import { Base64 } from './util'
import { ElectronService } from '../../core/electron.service';

class AssetsCollector {
    private roster: Map<(file) => boolean, (url, response, request?) => void> = new Map();
    // 一个url可能对应多个文件
    public EigenUrls: Map<string, Array<string>> = new Map();
    constructor() { }
    register(filter: (file) => boolean, callback: (url, response, request?) => void) {
        this.roster.set(filter, callback);
    }
    checkUrl(label: string, url: string) {
        this.roster.forEach((callback, filter) => {
            if (filter(label)) {
                if (this.EigenUrls.has(url)) {
                    this.EigenUrls.get(url).push(label);
                } else {
                    this.EigenUrls.set(url, [label]);
                }
            }
        })
    }
    sendCollection(url: string, data: any) {
        this.EigenUrls.get(url).forEach(key => {
            this.roster.forEach((callback, filter) => {
                if (filter(key)) {
                    callback(url, { Label: key, Data: data });
                }
            })
        })
    }
}

@Injectable()
export class AigisGameDataService {
    private subscription: Map<string, Array<(url, response, request?) => void>> = new Map();
    private assetsRoster: Map<string, string> = new Map();
    private assetsCollector: AssetsCollector = new AssetsCollector();
    constructor(
        private debuggerService: DebuggerService,
        private electronService: ElectronService
    ) {
        debuggerService.Subscribe(
            {
                url: ['://millennium-war.net/', '://all.millennium-war.net/'],
                method: 'POST',
                request: true
            },
            (url, res, req) => {
                const u = new URL(url);
                const path = u.pathname.replace('/', '');
                const channel = Event[path];
                if (channel && this.subscription.has(channel)) {
                    Promise.all([this.parseData(res), this.parseData(req)])
                        .then(
                            ([response, request]) => this.subscription.get(channel).forEach(v => v(url, response, request)),
                            (err) => {
                                console.log('err in ', channel, res, req);
                                throw err;
                            })
                }
            }
        );

        debuggerService.Subscribe(
            {
                url: ['://assets.millennium-war.net/'],
                method: 'GET',
                request: false
            },
            (url, response) => {
                if (url.indexOf('/2iofz514jeks1y44k7al2ostm43xj085') !== -1 || url.indexOf('/1fp32igvpoxnb521p9dqypak5cal0xv0') !== -1) {
                    const allFileList = Decoder.DecodeList(response);
                    const reverseList = {};
                    allFileList.forEach((v, k) => {
                        // fileList里似乎有个无名key
                        if (k) {
                            if (this.subscription.has(k)) {
                                this.assetsRoster.set(v, k);
                            }
                            reverseList[v.replace('http://assets.millennium-war.net', '')] = k;
                            this.assetsCollector.checkUrl(k, v);
                        }
                    });
                    electronService.ipcRenderer.send('fileList', reverseList);
                    if (this.subscription.has('fileList')) {
                        this.subscription.get('fileList').forEach((v) => {
                            v(url, allFileList);
                        })
                    }
                } else if (this.assetsRoster.has(url) || this.assetsCollector.EigenUrls.has(url)) {
                    let buffer = response;
                    if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
                        buffer = Base64.Decode(buffer);
                    }
                    const data = parseAL(buffer) || buffer;
                    if (this.assetsRoster.has(url)) {
                        const channel = this.assetsRoster.get(url)
                        this.subscription.get(channel).forEach((v) => {
                            v(url, data);
                        })
                    }
                    if (this.assetsCollector.EigenUrls.has(url)) {
                        this.assetsCollector.sendCollection(url, data);
                    }
                }
            }
        );
    }

    subscribe(channel, callback: (url: string, response: any, request?: any) => void, request?: boolean) {
        if (typeof (channel) === 'string') {
            if (this.subscription.has(channel)) {
                this.subscription.get(channel).push(callback);
            } else {
                this.subscription.set(channel, [callback]);
            }
        } else if (typeof (channel) === 'function') {
            this.assetsCollector.register(channel, callback)
        }
    }

    async parseData(raw: any) {
        try {
            const arr = [];
            for (let i = 0; i < raw.length; i++) {
                arr.push(raw.charCodeAt(i));
            }
            const buffer = Buffer.from(arr);
            let decoded = Decoder.DecodeXml(buffer);
            let data;
            if (decoded) {
                const decompressed = Decompress(decoded);
                decoded = decompressed ? decompressed : decoded;
                const body_str = [];
                for (let i = 0; i < decoded.byteLength; i++) {
                    body_str.push(String.fromCharCode(decoded[i]));
                }
                data = body_str.join('');
            } else { data = raw; }
            data = Xml2json(data);
            data = data['DA'] || data;
            return data;
        } catch (err) { throw err; }
    }
}
