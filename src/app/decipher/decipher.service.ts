/**
 * Translated from http://millenniumwaraigis.wikia.com/wiki/User_blog:Lzlis/Interpreting_POST_responses
 */

import { Injectable } from '@angular/core'
import { Decoder } from './decode'
import { Decompress } from './decompress'
import { Base64 } from './base64'
import { WebContents } from 'electron';
import { PluginService } from '../core/plugin.service'
import { parseAL } from './AL'
import { ElectronService } from '../core/electron.service';

const aigisURL = 'https://millennium-war.net/';
const aigisRURL = 'https://all.millennium-war.net/';
const aigisFileListPath = '2iofz514jeks1y44k7al2ostm43xj085';
const aigisRFileListPath = '1fp32igvpoxnb521p9dqypak5cal0xv0';


@Injectable()
export class DecipherService {
    private reqMaps: Map<string, string> = null;
    private assetMaps: Map<string, string> = null;
    private fileListReq = null;
    private fileList = {};
    constructor(
        private pluginService: PluginService,
        private electronService: ElectronService
    ) {
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
                        if (
                            (params.request.url.startsWith(aigisURL) || params.request.url.startsWith(aigisRURL)) &&
                            params.request.method === 'POST'
                        ) {
                            this.reqMaps.set(params.requestId, params.request.url);
                        }
                        if (params.request.url.indexOf(aigisFileListPath) !== -1 || params.request.url.indexOf(aigisRFileListPath) !== -1) {
                            console.log('FileList: ' + params.request.url);
                            this.fileListReq = params.requestId;
                        }
                        if ((params.request.url.startsWith('http://assets.millennium-war.net/') && params.request.method === 'GET')) {
                            this.assetMaps.set(params.requestId, params.request.url);
                        }
                        break;
                    case 'Network.loadingFinished':
                        // 处理response
                        if (this.reqMaps.has(params.requestId)) {
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                'requestId': params.requestId
                            }, (err, response) => {
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
                                this.pluginService.AddResponse(data, this.reqMaps.get(params.requestId));
                            });
                        }
                        // 处理assets
                        if (this.assetMaps.has(params.requestId)) {
                            /* webContents.debugger.sendCommand('Network.getResponseBody', {
                                'requestId': params.requestId
                            }, (err, response) => {
                                let buffer = response.body;
                                if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
                                    buffer = Base64.Decode(buffer);
                                }
                                if (buffer[0] === 'A' && buffer[1] === 'L') {
                                    // console.log(parseAL(buffer));
                                }
                            });*/
                        }
                        if (params.requestId === this.fileListReq) {
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                'requestId': params.requestId
                            }, (err, response) => {
                                this.fileList = Decoder.DecodeList(response.body);
                                this.electronService.ipcRenderer.send('fileList', this.fileList);
                                console.log(this.fileList);
                            });
                        }
                        break;
                }
            });
            this.reqMaps = new Map();
            this.assetMaps = new Map();
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
