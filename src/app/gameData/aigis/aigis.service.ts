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

@Injectable()
export class AigisGameDataService {
    private subscription: Map<string, Array<(data, url) => void>> = new Map();
    private assetsRoster: Map<string, string> = new Map();
    private requestSubscription: Map<string, Array<(data, url) => void>> = new Map();
    constructor(
        private debuggerService: DebuggerService
    ) {
        debuggerService.Subscribe(
            {
                url: ['://millennium-war.net/', '://all.millennium-war.net/'],
                method: 'POST',
                request: true
            },
            (url, response, request) => {
                const u = new URL(url);
                const path = u.pathname.replace('/', '');
                const channel = Event[path];
                const subscription = request ? this.requestSubscription : this.subscription;
                if (channel && subscription.has(channel)) {
                    const decoded = Decoder.DecodeXml(response);
                    let data;
                    if (decoded) {
                        const decompressed = Decompress(decoded);
                        const body_str = [];
                        for (let i = 0; i < decompressed.byteLength; i++) {
                            body_str.push(String.fromCharCode(decompressed[i]));
                        }
                        data = body_str.join('');
                    } else { data = response; }
                    data = Xml2json(data);
                    data = data['DA'] || data;

                    subscription.get(channel).forEach((v) => {
                        v(data, url);
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
                    allFileList.forEach((v, k) => {
                        if (this.subscription.has(k)) {
                            this.assetsRoster.set(v, k);
                        }
                    });
                } else if (this.assetsRoster.has(url)) {
                    let buffer = response;
                    if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
                        buffer = Base64.Decode(buffer);
                    }
                    const data = parseAL(buffer) || buffer;
                    const channel = this.assetsRoster.get(url)
                    this.subscription.get(channel).forEach((v) => {
                        v(data, url);
                    })
                }

            }
        );
    }
    subscribe(channel, callback: (data: object, url: string) => void, request?: boolean) {
        const subscription = request ? this.requestSubscription : this.subscription
        if (subscription.has(channel)) {
            subscription.get(channel).push(callback);
        } else {
            subscription.set(channel, [callback]);
        }
    }
}
