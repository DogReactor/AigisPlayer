export class Base64 {
    static Encode = (bytes) => {
        const binary = [];
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary.push(String.fromCharCode(bytes[i]));
        }
        return window.btoa(binary.join(''));
    };

    static Decode = (str) => {
        const binary_str = window.atob(str);
        const len = binary_str.length;
        const bytes = new Buffer(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_str.charCodeAt(i);
        }
        return bytes;
    }
};
