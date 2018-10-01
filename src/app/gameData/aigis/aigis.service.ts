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

class AssetsCollector {
    private roster: Map<Array<string>, Array<(data, url) => void>> = new Map();
    public eigenUrl = {}
    constructor(){}
    register(flag:Array<string>, callback:(data, url) => void){
        this.roster.forEach((v,k)=>{
            if(flag.every(e=>k.indexOf(e)!=-1)){
                v.push(callback);
                return;
            }
        })
        this.roster.set(flag, [callback]);
    }
    checkUrl(label:string, url:string) {
        this.roster.forEach((funcGroup,key)=>{
            if(key.every(k=>label.includes(k))) {
                if(this.eigenUrl.hasOwnProperty(url)) {
                    Array.prototype.push.apply(this.eigenUrl[url].callbackPool, funcGroup);
                    this.eigenUrl[url].files.push(label)
                }
                else {
                    this.eigenUrl[url] = {callbackPool:[].concat(funcGroup), files:[label]};
                }
            }
        })
    }
}

@Injectable()
export class AigisGameDataService {
    private subscription: Map<string, Array<(data, url) => void>> = new Map();
    private requestSubscription: Map<string, Array<(data, url) => void>> = new Map();
    private assetsRoster: Map<string,string> = new Map();
    private assetsCollector: AssetsCollector = new AssetsCollector();
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
                if(url.indexOf('/2iofz514jeks1y44k7al2ostm43xj085')!=-1||url.indexOf('/1fp32igvpoxnb521p9dqypak5cal0xv0')!=-1) {
                    let allFileList = Decoder.DecodeList(response);
                    allFileList.forEach((v,k)=>{
                        // fileList里似乎有个无名key
                        if(k) {
                            if(this.subscription.has(k)) {
                                this.assetsRoster.set(v,k);
                            }
                            this.assetsCollector.checkUrl(k,v);
                        }  
                    });
                }
                else if(this.assetsRoster.has(url)||this.assetsCollector.eigenUrl.hasOwnProperty(url)) {
                    let buffer = response;
                    if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
                        buffer = Base64.Decode(buffer);
                    }                
                    let data = parseAL(buffer)||buffer;
                    if(this.assetsRoster.has(url)) {
                        let channel = this.assetsRoster.get(url)
                        this.subscription.get(channel).forEach((v) => {
                            v(data, url);
                        })
                    }
                    if(this.assetsCollector.eigenUrl.hasOwnProperty(url)) {
                        let obj = this.assetsCollector.eigenUrl[url]
                        obj.callbackPool.forEach((v)=>{
                            v({Files:obj.files,Data:data}, url);
                        })
                    }
                    
                }

            }
        );
    }
    subscribe(channel, callback: (data: object, url: string) => void, request?: boolean) {
        const subscription = request ? this.requestSubscription : this.subscription
        if(typeof(channel)==='string') {
            if (subscription.has(channel)) {
                subscription.get(channel).push(callback);
            } else {
                subscription.set(channel, [callback]);
            }
        }
        else if (typeof(channel)==='object') {
            this.assetsCollector.register(channel, callback)
        }
        
    }
}
