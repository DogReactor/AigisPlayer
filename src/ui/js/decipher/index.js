/**
 * Translated from http://millenniumwaraigis.wikia.com/wiki/User_blog:Lzlis/Interpreting_POST_responses
 */

const {decodeXml,decodeList} = require('./decode');
const {decompress} = require('./decompress');
const base64 = require('./base64');

let reqMaps = null;
let assetMaps = null;
let fileListReq = null;

module.exports = {
    attach: (webContents,eventHub,id) => {
        try {
            webContents.debugger.attach('1.1');
            webContents.debugger.on('detach', (event, reason) => {
                console.log('Debugger detached due to : ', reason);
            });

            webContents.debugger.on('message', (event, method, params) => {
                switch (method) {
                    case 'Network.requestWillBeSent':
                        if ((params.request.url.startsWith('https://millennium-war.net/') || params.request.url.startsWith('https://all.millennium-war.net/')) && params.request.method === 'POST') {
                            reqMaps.set(params.requestId, params.request.url);
                        }
                        if (params.request.url.indexOf('1fp32igvpoxnb521p9dqypak5cal0xv0') !== -1 || params.request.url.indexOf('2iofz514jeks1y44k7al2ostm43xj085') !== -1) {
                            console.log(params.request.url);
                            fileListReq = params.requestId;
                        }
                        /*if ((params.request.url.startsWith('http://assets.millennium-war.net/') && params.request.method === 'GET')) {
                            assetMaps.set(params.requestId, params.request.url);
                        }*/
                        break;
                    case 'Network.loadingFinished':
                        if (reqMaps.has(params.requestId)) {
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                "requestId": params.requestId
                            }, (err, response) => {
                                let decoded = decodeXml(response.body);
                                if (decoded) {
                                    let decompressed = decompress(decoded);
                                    let body_str = [];
                                    for (let i = 0; i < decompressed.byteLength; i++) {
                                        body_str.push(String.fromCharCode(decompressed[i]));
                                    }
                                    eventHub.$emit('XHR-xml-data',reqMaps.get(params.requestId),body_str.join(''),id);
                                } else {
                                    eventHub.$emit('XHR-xml-data',reqMaps.get(params.requestId),response.body,id);
                                }                            
                                reqMaps.delete(params.requestId);
                            });
                        }
                        if(assetMaps.has(params.requestId)){
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                "requestId":params.requestId
                            },(err,response) => {
                                let buffer = response.body;
                                if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
                                    buffer = base64.decode(buffer);
                                }
                                console.log(String.fromCharCode(buffer[0]),String.fromCharCode(buffer[1]),String.fromCharCode(buffer[2]),String.fromCharCode(buffer[3]),assetMaps.get(params.requestId));
                            });
                        }
                        if (params.requestId === fileListReq) {
                            webContents.debugger.sendCommand('Network.getResponseBody', {
                                "requestId": params.requestId
                            }, (err, response) => {
                                let fileList = decodeList(response.body);
                                eventHub.$emit('new-FileList',fileList);
                            });
                        }
                        break;
                }
            });
            reqMaps = new Map();
            assetMaps = new Map();
            webContents.debugger.sendCommand('Network.enable');
        } catch (err) {
            console.log('Debugger attach failed : ', err);
        }
    },

    detach: (webContents) => {
        webContents.debugger.detach();
        reqMaps = null;
        fileListReq = null;
    }
}
