import { Base64 } from './util'

const decode = (buffer, key) => {
    const decoded = new Uint8Array(buffer.byteLength);
    for (let i = 0; i < buffer.byteLength; i++) {
        decoded[i] = buffer[i] ^ key;
    }
    return decoded;
};

export class Decoder {
    static DecodeList = (buffer) => {
        const aigisAssetsBegin = 'http://assets.millennium-war.net/'
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
            buffer = Base64.Decode(buffer);
        }

        const b = [];
        const d = decode(buffer, 0xea ^ 0x30);
        for (let i = 0; i < d.byteLength; i++) {
            b.push(String.fromCharCode(d[i]));
        }
        const csvData = b.join('');
        const csvDatas = csvData.split('\n');
        const datas: Map<string, string> = new Map();
        for (let i = 0; i < csvDatas.length; i++) {
            const data = csvDatas[i].split(',');
            /*let obj = {
                path : d[0] + '/' + d[1],
                type : d[2],
                length : d[3],
                fileName : d[4]
            }
            datas.push(obj);*/
            datas.set(data[4], aigisAssetsBegin + data[0] + '/' + data[1])
        }

        return datas;
    };

    static DecodeXml = (buffer) => {
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
            buffer = Base64.Decode(buffer);
        }

        const head = '<DA>';
        const startByte = head.charCodeAt(0);
        for (let i = 0; i < Math.min(100, buffer.byteLength); i++) {
            let test = true;
            const _b = buffer[i];
            for (let j = 1; j < head.length; j++) {
                // aaaaa aaaaa bbbbb bbbbb
                const testVal = _b ^ buffer[i + j];
                const canon = startByte ^ head.charCodeAt(j);
                if (testVal !== canon) {
                    test = false;
                    break;
                }
            }
            if (test) {
                return decode(buffer, startByte ^ _b)
            }
        }
    }
}
