import { Injectable } from '@angular/core';
import { DebuggerService } from '../debugger.service';
import { Decoder } from './decode'
import { Decompress } from './decompress'
import { Base64 } from './util'
import { PluginService } from '../../core/plugin.service';
import { URL } from 'url';
import { Xml2json } from './xml2json';
import { Event } from './EventList';

@Injectable()
export class AigisGameDataService {
    private subscription: Map<string, Array<(data, url) => void>> = new Map();
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

                if (channel && this.subscription.has(channel)) {
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
                    data = Xml2json(data);
                    data = data['DA'] || data;
                    const subscription = request ? this.requestSubscription : this.subscription;
                    subscription.get(channel).forEach((v) => {
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
