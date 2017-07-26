const base64 = require('./base64');

let decode = (buffer, key) => {
    let decoded = new Uint8Array(buffer.byteLength);
    for (let i = 0; i < buffer.byteLength; i++) {
        decoded[i] = buffer[i] ^ key;
    }
    return decoded;
};

module.exports = {
    decodeList: (buffer) => {
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
            buffer = base64.decode(buffer);
        }

        let b = [];
        let d = decode(buffer, 0xea ^ 0x30);
        for(let i = 0; i<d.byteLength; i++){
            b.push(String.fromCharCode(d[i]));
        }
        let csvData = b.join('');
        let csvDatas = csvData.split('\n');
        let datas = [];
        for(let i = 0; i < csvDatas.length; i++){
            let d = csvDatas[i].split(',');
            let obj = {
                path : d[0] + '/' + d[1],
                type : d[2],
                length : d[3],
                fileName : d[4]
            }
            datas.push(obj);
        }

        return datas;
    },

    decodeXml: (buffer) => {
        if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(buffer)) {
            buffer = base64.decode(buffer);
        }

        let head = "<?xml version=\"";
        let startByte = head.charCodeAt(0);
        for (let i = 0; i < Math.min(100, buffer.byteLength); i++) {
            let test = true;
            let b = buffer[i];
            for (let j = 1; j < head.length; j++) {
                // aaaaa aaaaa bbbbb bbbbb
                let testVal = b ^ buffer[i + j];
                let canon = startByte ^ head.charCodeAt(j);
                if (testVal !== canon) {
                    test = false;
                    break;
                }
            }
            if (test) {
                return decode(buffer, startByte ^ b)
            }
        }
    }
}
