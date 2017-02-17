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
        return decode(buffer, 0xea ^ 0x30);
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
