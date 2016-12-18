module.exports = {
    encode: (bytes) => {
        let binary = [];
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary.push(String.fromCharCode(bytes[i]));
        }
        return window.btoa(binary.join(''));
    },

    decode: (str) => {
        let binary_str = window.atob(str);
        let len = binary_str.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_str.charCodeAt(i);
        }
        return bytes;
    }
};
