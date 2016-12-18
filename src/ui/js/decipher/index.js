/**
 * Translated from http://millenniumwaraigis.wikia.com/wiki/User_blog:Lzlis/Interpreting_POST_responses
 */

const {decodeXml} = require('./decode');
const {decompress} = require('./decompress');

let reqMaps = null;

module.exports = {
    attach: (webContents) => {
        try {
            webContents.debugger.attach('1.1');
        } catch (err) {
            console.log('Debugger attach failed : ', err);
        }

        webContents.debugger.on('detach', (event, reason) => {
            console.log('Debugger detached due to : ', reason);
        });

        webContents.debugger.on('message', (event, method, params) => {
            switch (method) {
                case 'Network.requestWillBeSent':
                    if (params.request.url.startsWith('https://all.millennium-war.net/') && params.request.method === 'POST') {
                        reqMaps.set(params.requestId, params.request.url);
                    }
                    break;
                case 'Network.loadingFinished':
                    if (reqMaps.has(params.requestId)) {
                        webContents.debugger.sendCommand('Network.getResponseBody', {
                            "requestId": params.requestId
                        }, (err, response) => {
                            console.log(reqMaps.get(params.requestId));

                            let decoded = decodeXml(response.body);
                            if (decoded) {
                                let decompressed = decompress(decoded);
                                let body_str = [];
                                for (let i = 0; i < decompressed.byteLength; i++) {
                                    body_str.push(String.fromCharCode(decompressed[i]));
                                }
                                console.log(body_str.join(''));
                            } else {
                                console.log(response.body);
                            }                            
                            
                            reqMaps.delete(params.requestId);
                        });
                    }
                    break;
            }
        });

        reqMaps = new Map();
        webContents.debugger.sendCommand('Network.enable');
    },

    detach: (webContents) => {
        webContents.debugger.detach();
        reqMaps = null;
    }
}
