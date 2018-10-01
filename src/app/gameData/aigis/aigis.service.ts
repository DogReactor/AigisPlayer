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

@Injectable()
export class AigisGameDataService {
    private subscription: Map<string, Array<(data, url) => void>> = new Map();
    private assetsRoster: Map<string,string> = new Map();
    constructor(
        private debuggerService: DebuggerService
    ) {
        debuggerService.Subscribe(
            ['://millennium-war.net/', '://all.millennium-war.net/'],
            'POST',
            (url, response) => {
                const decoded = Decoder.DecodeXml(response.body);
                let data;
                if (decoded) {
                    const decompressed = Decompress(decoded);
                    const body_str = [];
                    for (let i = 0; i < decompressed.byteLength; i++) {
                        body_str.push(String.fromCharCode(decompressed[i]));
                    }
                    data = body_str.join('');
                } else { data = response.body; }

                const u = new URL(url);
                const path = u.pathname.replace('/', '');
                data = Xml2json(data);
                data = data['DA'] || data;
                const channel = Event[path];
                if (channel && this.subscription.has(channel)) {
                    this.subscription.get(channel).forEach((v) => {
                        v(data, url);
                    })
                }
            }
        );

        
        debuggerService.Subscribe(
            ['://assets.millennium-war.net/'],
            'GET',
            (url, response) => {
                if(url.indexOf('/2iofz514jeks1y44k7al2ostm43xj085')!=-1||url.indexOf('/1fp32igvpoxnb521p9dqypak5cal0xv0')!=-1) {
                    let allFileList = Decoder.DecodeList(response.body);
                    Object.keys(allFileList).forEach(u=>{
                        if(this.subscription.has(allFileList[u])) {
                            this.assetsRoster.set(u,allFileList[u]);
                        }
                    });

                }
                else if(this.assetsRoster.has(url)) {                
                    let data = parseAL(response.body)||response.body;
                    let channel = this.assetsRoster.get(url)
                    this.subscription.get(channel).forEach((v) => {
                        v(data, url);
                    })
                }

            }
        );
    }
    subscribe(channel, callback: (data: object, url: string) => void) {
        if (this.subscription.has(channel)) {
            this.subscription.get(channel).push(callback);
        } else {
            this.subscription.set(channel, [callback]);
        }
    }
}
