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
    }
    subscribe(channel, callback: (data: object, url: string) => void) {
        if (this.subscription.has(channel)) {
            this.subscription.get(channel).push(callback);
        } else {
            this.subscription.set(channel, [callback]);
        }
    }
}
