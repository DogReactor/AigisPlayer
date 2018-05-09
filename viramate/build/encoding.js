"use strict";
var encoding = Object.create(null);
encoding.UTF8 = Object.create(null);
encoding.Base64 = Object.create(null);
encoding.fromCharCode = function fixedFromCharCode(codePt) {
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/fromCharCode
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    else {
        return String.fromCharCode(codePt);
    }
};
encoding.charCodeAt = function fixedCharCodeAt(str, idx) {
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)  
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low))
            throw new Error("High surrogate not followed by low surrogate");
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        // Low surrogate  
        // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration  
        return false;
    }
    return code;
};
/// makeByteWriter(Uint8Array buffer, offset)
///   getResult -> (Uint8Array view on used region of buffer)
/// makeByteWriter()
///   getResult -> (Uint8Array containing written bytes)
encoding.makeByteWriter = function (outputBytes, outputIndex) {
    if (arguments.length === 2) {
        var i = outputIndex | 0;
        var count = 0;
        return {
            write: function (byte) {
                if (i >= outputBytes.length)
                    throw new Error("End of buffer");
                outputBytes[i] = byte;
                i++;
                count++;
            },
            getPosition: function () {
                return count;
            },
            getResult: function () {
                return outputBytes.slice(outputIndex, outputIndex + count);
            }
        };
    }
    else {
        var resultBytes = new Array();
        return {
            write: function (byte) {
                resultBytes.push(byte);
            },
            getPosition: function () {
                return resultBytes.length;
            },
            getResult: function () {
                if (typeof (Uint8Array) !== "undefined")
                    return new Uint8Array(resultBytes);
                else
                    return resultBytes;
            }
        };
    }
};
encoding.makeByteReader = function (bytes, index, count) {
    var position = (typeof (index) === "number") ? index : 0;
    var endpoint;
    if (typeof (count) === "number")
        endpoint = (position + count);
    else
        endpoint = (bytes.length - position);
    var peek = function peek(offset) {
        offset |= 0;
        if (position + offset >= endpoint)
            return false;
        return bytes[position + offset];
    };
    var result = {
        peek: peek,
        read: function () {
            var result = peek(0);
            position += 1;
            return result;
        },
        getPosition: function () {
            return position;
        },
        skip: function (distance) {
            position += distance;
        }
    };
    Object.defineProperty(result, "eof", {
        get: function () {
            return (position >= endpoint);
        },
        configurable: true,
        enumerable: true
    });
    return result;
};
encoding.makeCharacterReader = function (str) {
    var position = 0, length = str.length;
    var cca = encoding.charCodeAt;
    var peek = function peek(offset) {
        offset |= 0;
        if (position + offset >= length)
            return false;
        return cca(str, position + offset);
    };
    var result = {
        peek: peek,
        read: function () {
            var result = peek(0);
            position += 1;
            return result;
        },
        getPosition: function () {
            return position;
        },
        skip: function (distance) {
            position += distance;
        }
    };
    Object.defineProperty(result, "eof", {
        get: function () {
            return (position >= length);
        },
        configurable: true,
        enumerable: true
    });
    return result;
};
/// encode(str, outputBytes, outputOffset) -> numBytesWritten
/// encode(str, outputWriter) -> numBytesWritten
/// encode(str) -> Uint8Array
encoding.UTF8.encode = function (string, output, outputIndex) {
    // http://tidy.sourceforge.net/cgi-bin/lxr/source/src/utf8.c
    var UTF8ByteSwapNotAChar = 0xFFFE;
    var UTF8NotAChar = 0xFFFF;
    var writer;
    if ((arguments.length === 3) && output.buffer) {
        writer = encoding.makeByteWriter(output, outputIndex);
    }
    else if (arguments.length === 2) {
        if (output && output.write && output.getResult)
            writer = output;
        else
            throw new Error("Expected 2nd arg to be a writer");
    }
    else if (arguments.length === 1) {
        writer = encoding.makeByteWriter();
    }
    if (typeof (string) !== "string")
        throw new Error("String expected");
    else if (!writer)
        throw new Error("No writer available");
    var reader = encoding.makeCharacterReader(string), ch;
    var hasError = false;
    while (!reader.eof) {
        ch = reader.read();
        if (ch === false)
            continue;
        if (ch <= 0x7F) {
            writer.write(ch);
        }
        else if (ch <= 0x7FF) {
            writer.write(0xC0 | (ch >> 6));
            writer.write(0x80 | (ch & 0x3F));
        }
        else if (ch <= 0xFFFF) {
            writer.write(0xE0 | (ch >> 12));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
        }
        else if (ch <= 0x1FFFF) {
            writer.write(0xF0 | (ch >> 18));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            if ((ch === UTF8ByteSwapNotAChar) || (ch === UTF8NotAChar))
                hasError = true;
        }
        else if (ch <= 0x3FFFFFF) {
            writer.write(0xF0 | (ch >> 24));
            writer.write(0x80 | ((ch >> 18) & 0x3F));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            hasError = true;
        }
        else if (ch <= 0x7FFFFFFF) {
            writer.write(0xF0 | (ch >> 30));
            writer.write(0x80 | ((ch >> 24) & 0x3F));
            writer.write(0x80 | ((ch >> 18) & 0x3F));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            hasError = true;
        }
        else {
            hasError = true;
        }
    }
    return writer.getResult();
};
encoding.UTF8.decode = function (bytes, index, count) {
    // http://tidy.sourceforge.net/cgi-bin/lxr/source/src/utf8.c
    var UTF8ByteSwapNotAChar = 0xFFFE;
    var UTF8NotAChar = 0xFFFF;
    var reader = encoding.makeByteReader(bytes, index, count), firstByte;
    var result = "";
    while (!reader.eof) {
        var accumulator = 0, extraBytes = 0, hasError = false;
        firstByte = reader.read();
        if (firstByte === false)
            continue;
        if (firstByte <= 0x7F) {
            accumulator = firstByte;
        }
        else if ((firstByte & 0xE0) === 0xC0) {
            accumulator = firstByte & 31;
            extraBytes = 1;
        }
        else if ((firstByte & 0xF0) === 0xE0) {
            accumulator = firstByte & 15;
            extraBytes = 2;
        }
        else if ((firstByte & 0xF8) === 0xF0) {
            accumulator = firstByte & 7;
            extraBytes = 3;
        }
        else if ((firstByte & 0xFC) === 0xF8) {
            accumulator = firstByte & 3;
            extraBytes = 4;
            hasError = true;
        }
        else if ((firstByte & 0xFE) === 0xFC) {
            accumulator = firstByte & 3;
            extraBytes = 5;
            hasError = true;
        }
        else {
            accumulator = firstByte;
            hasError = false;
        }
        while (extraBytes > 0) {
            var extraByte = reader.read();
            extraBytes--;
            if (extraByte === false) {
                hasError = true;
                break;
            }
            if ((extraByte & 0xC0) !== 0x80) {
                hasError = true;
                break;
            }
            accumulator = (accumulator << 6) | (extraByte & 0x3F);
        }
        if ((accumulator === UTF8ByteSwapNotAChar) || (accumulator === UTF8NotAChar))
            hasError = true;
        var characters;
        if (!hasError)
            characters = encoding.fromCharCode(accumulator);
        if (hasError || (characters === false)) {
            throw new Error("Invalid character in UTF8 text");
        }
        else
            result += characters;
    }
    return result;
};
encoding.Base64.IgnoredCodepoints = [
    9, 10, 13, 32
];
encoding.Base64.Table = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X',
    'Y', 'Z',
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x',
    'y', 'z',
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9',
    '+', '/'
];
encoding.Base64.CodeTable = new Uint8Array(encoding.Base64.Table.length);
for (var i = 0; i < encoding.Base64.Table.length; i++)
    encoding.Base64.CodeTable[i] = encoding.Base64.Table[i].charCodeAt(0);
encoding.Base64.arrayToString = function (inArray, offset, length) {
    var reader = encoding.makeByteReader(inArray, offset, length);
    var result = "";
    var ch1 = 0, ch2 = 0, ch3 = 0, bits = 0, equalsCount = 0, sum = 0;
    var mask1 = (1 << 24) - 1, mask2 = (1 << 18) - 1, mask3 = (1 << 12) - 1, mask4 = (1 << 6) - 1;
    var shift1 = 18, shift2 = 12, shift3 = 6, shift4 = 0;
    var table = encoding.Base64.Table;
    while (true) {
        ch1 = reader.read();
        ch2 = reader.read();
        ch3 = reader.read();
        if (ch1 === false)
            break;
        if (ch2 === false) {
            ch2 = 0;
            equalsCount += 1;
        }
        if (ch3 === false) {
            ch3 = 0;
            equalsCount += 1;
        }
        // Seems backwards, but is right!
        sum = (ch1 << 16) | (ch2 << 8) | (ch3 << 0);
        bits = (sum & mask1) >> shift1;
        result += table[bits];
        bits = (sum & mask2) >> shift2;
        result += table[bits];
        if (equalsCount < 2) {
            bits = (sum & mask3) >> shift3;
            result += table[bits];
        }
        if (equalsCount === 2) {
            result += "==";
        }
        else if (equalsCount === 1) {
            result += "=";
        }
        else {
            bits = (sum & mask4) >> shift4;
            result += table[bits];
        }
    }
    return result;
};
encoding.Base64.stringToArray = function (s) {
    var lengthErrorMessage = "Invalid length for a Base-64 char array.";
    var contentErrorMessage = "The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or a non-white space character among the padding characters.";
    var result = [];
    var reader = encoding.makeCharacterReader(s);
    var sum = 0;
    var ch0 = 0, ch1 = 0, ch2 = 0, ch3 = 0;
    var index0 = -1, index1 = -1, index2 = -1, index3 = -1;
    var equals = "=".charCodeAt(0);
    while (true) {
        ch0 = reader.read();
        if (ch0 === false)
            break;
        if (encoding.Base64.IgnoredCodepoints.indexOf(ch0) >= 0)
            continue;
        ch1 = reader.read();
        ch2 = reader.read();
        ch3 = reader.read();
        if ((ch1 === false) || (ch2 === false) || (ch3 === false))
            throw new Error(lengthErrorMessage);
        index0 = encoding.Base64.CodeTable.indexOf(ch0);
        index1 = encoding.Base64.CodeTable.indexOf(ch1);
        index2 = encoding.Base64.CodeTable.indexOf(ch2);
        index3 = encoding.Base64.CodeTable.indexOf(ch3);
        if ((index0 < 0) || (index0 > 63) ||
            (index1 < 0) || (index1 > 63))
            throw new Error(contentErrorMessage);
        sum = (index0 << 18) | (index1 << 12);
        if (index2 >= 0)
            sum |= (index2 << 6);
        else if (ch2 !== equals)
            throw new Error(contentErrorMessage);
        if (index3 >= 0)
            sum |= (index3 << 0);
        else if (ch3 !== equals)
            throw new Error(contentErrorMessage);
        result.push((sum >> 16) & 0xFF);
        if (index2 >= 0)
            result.push((sum >> 8) & 0xFF);
        if (index3 >= 0)
            result.push(sum & 0xFF);
    }
    return new Uint8Array(result);
};
encoding.Base64.stringToImageURL = function (s) {
    var buffer = encoding.Base64.stringToArray(s);
    var blob = new Blob([buffer]);
    var blobUrl = window.URL.createObjectURL(blob);
    return blobUrl;
};
//# sourceMappingURL=encoding.js.map