// @ts-check
'use strict';

const http = require('http');
const request = require('request');
const express = require('express');
const Agent = require('socks5-http-client/lib/Agent');
const fs = require('fs');
const zlib = require('zlib');
let FileList = {};
let ProxyHost = "127.0.0.1"
let ProxyPort = 1080;
let ProxyEnable = false;
let ProxyIsSocks5 = false;
let TranslateFileList = {
    'StatusText.atb': "StatusText.txt",
    'MainFont.aft': "MainFont.aft",
    'AbilityList.atb': "AbilityList.txt",
    'AbilityText.atb': "AbilityText.txt",
    'NameText.atb': "NameText.txt",
    'PlayerTitle.atb': "PlayerTitle.txt",
    'SkillList.atb': "SkillList.txt",
    'SkillText.atb': "SkillText.txt",
    'SystemText.atb': "SystemText.txt",
    "PlayerUnitTable.aar": "PlayerUnitTable",
    "BattleTalkEvent800001.aar": "BattleTalkEvent800001"
};

/**
 * 
 * @param {Buffer} buffer 
 * @param {Number} offset 
 */
function ReadString(buffer, offset) {
    let start = offset;
    for (let i = 0; i < 0xFFFF; i++) {
        let b = buffer.readUInt8(offset); offset++;
        if (b === 0) break;
    }
    return {
        s: buffer.toString('utf-8', start, offset - 1),
        offset: offset
    }
}
function Align(offset, length) {
    if (offset % 4 == 0) return offset;
    return offset + (4 - offset % 4);
}

class AL {
    constructor(buffer) {
        this.buffer = buffer;
    }
    Package() {
        return this.buffer;
    }
}

class ALLZ {
    /**
     * 
     * @param {Buffer} buffer 
     * @param {Number} offset 
     */
    constructor(buffer, offset) {
        let self = this;
        let startOffset = offset;
        this.Head = buffer.toString('utf-8', offset, offset + 4); offset += 4;
        this.Vers = buffer.readUInt8(offset); offset++;
        this.MinBitsLength = buffer.readUInt8(offset); offset++;
        this.MinBitsOffset = buffer.readUInt8(offset); offset++;
        this.MinBitsLiteral = buffer.readUInt8(offset); offset++;
        this.DstSize = buffer.readUInt32LE(offset); offset += 4;
        this.Dst = new Buffer(this.DstSize);
        this.Dst.fill(0);
        this.Size = 0;
        let dstOffset = 0;

        let bits = 0;
        let bitsCount = 0;

        copyLiteral(readControlLiteral());
        let wordOffset = readControlOffset();
        let wordLength = readControlLength();
        let literalLength = 0;

        let finish = "overflow";

        while (offset <= buffer.length) {
            if (dstOffset + wordLength >= this.DstSize) {
                finish = "word";
                break;
            }
            if (readBit() == 0) {
                literalLength = readControlLiteral();
                if (dstOffset + wordLength + literalLength >= this.DstSize) {
                    finish = "literal";
                    break;
                }
                copyWord(wordOffset, wordLength);
                copyLiteral(literalLength);
                wordOffset = readControlOffset();
                wordLength = readControlLength();
            }
            else {
                copyWord(wordOffset, wordLength);
                wordOffset = readControlOffset();
                wordLength = readControlLength();
            }
        }
        if (finish == "word") copyWord(wordOffset, wordLength);
        if (finish == "literal") {
            copyWord(wordOffset, wordLength);
            copyLiteral(literalLength);
        }
        if (finish == "overflow") throw "Overflow in ALLZ";

        this.FileSize = offset - startOffset;
        /**
         * 
         * @param {Number} count 
         */
        function ensure(count) {
            while (bitsCount < count) {
                bits = bits | (buffer.readUInt8(offset) << bitsCount); offset++;
                bitsCount += 8;
            }
        }
        function readBit() {
            ensure(1);
            let result = bits & 1;
            bits = bits >> 1;
            bitsCount -= 1;
            return result;
        }
        /**
         * 
         * @param {Number} count 
         */
        function readBits(count) {
            ensure(count);
            let result = bits & ((1 << count) - 1);
            bits = bits >> count;
            bitsCount -= count;
            return result;
        }
        function readUnary() {
            let n = 0;
            while (readBit() == 1) n++;
            return n;
        }
        /**
         * 
         * @param {Number} minBits 
         */
        function readControl(minBits) {
            let u = readUnary();
            let n = readBits(u + minBits);
            if (u > 0) {
                return n + (((1 << u) - 1) << minBits);
            }
            else {
                return n;
            }
        }
        function readControlLength() {
            return 3 + readControl(self.MinBitsLength);
        }
        function readControlOffset() {
            return -1 - readControl(self.MinBitsOffset);

        }
        function readControlLiteral() {
            return 1 + readControl(self.MinBitsLiteral);
        }
        /**
         * 
         * @param {Number} offset 
         * @param {Number} length 
         */
        function copyWord(offset, length) {
            let trueOffset = offset;
            for (let i = 0; i < length; i++) {
                if (offset < 0) trueOffset = dstOffset + offset;
                self.Dst.writeUInt8(self.Dst[trueOffset], dstOffset); dstOffset++;
            }
        }
        /**
         * 
         * @param {Number} control 
         */
        function copyLiteral(control) {
            buffer.copy(self.Dst, dstOffset, offset, offset + control); offset += control; dstOffset += control;
        }
    }
}

class ALRD {
    /**
     * 
     * @param {Buffer} buffer 
     * @param {Number} offset 
     */
    constructor(buffer, offset) {
        class Header {
            constructor() {
                this.Offset = 0;
                this.Type = 0;
                this.NameEN = "";
                this.NameJP = "";
            }
        }
        let startOffset = offset;
        this.Head = buffer.toString('utf-8', offset, offset + 4); offset += 4;
        if (this.Head !== "ALRD") throw "这不是ALRD";
        this.Vers = buffer.readUInt16LE(offset); offset += 2;
        this.Count = buffer.readUInt16LE(offset); offset += 2;
        this.Size = buffer.readUInt16LE(offset); offset += 2;
        this.Headers = [];
        for (let i = 0; i < this.Count; i++) {
            let header = new Header();
            header.Offset = buffer.readUInt16LE(offset); offset += 2;
            header.Type = buffer.readUInt8(offset); offset++;
            let emptyLength = buffer.readUInt8(offset); offset++;
            let lengthEN = buffer.readUInt8(offset); offset++;
            let lengthJP = buffer.readUInt8(offset); offset++;
            let ENResult = ReadString(buffer, offset);
            offset = ENResult.offset;
            header.NameEN = ENResult.s;
            let JPResult = ReadString(buffer, offset);
            offset = JPResult.offset;
            header.NameJP = JPResult.s;
            offset = Align(offset, 4);
            offset += emptyLength;
            offset = Align(offset, 4);
            this.Headers.push(header);
        }
        this.FileSize = offset - startOffset;
    }
}

class ALTB {
    /**
     * 
     * @param {Buffer} buffer 
     * @param {Number} offset 
     */
    constructor(buffer, offset) {
        let self = this;
        let startOffset = offset;
        this.RawBuffer = buffer;
        this.Head = buffer.toString('utf-8', offset, offset + 4); offset += 4;
        if (this.Head !== "ALTB") throw "这不是ALTB文件"
        this.Vers = buffer.readUInt8(offset); offset++;
        this.Form = buffer.readUInt8(offset); offset++;
        this.Count = buffer.readUInt16LE(offset); offset += 2;
        this.Unknown1 = buffer.readUInt16LE(offset); offset += 2;
        //需要加验证form和unk1的值
        //0x10 -> 0x14
        //0x14 -> 0x1c
        //0x1e -> 0x20
        this.TableEntry = buffer.readUInt16LE(offset); offset += 2;
        this.Size = buffer.readUInt32LE(offset); offset += 4;
        if (this.Form === 0x14 || this.Form === 0x1e) {
            this.StringFieldSizePosition = offset;
            this.StringFieldSize = buffer.readUInt32LE(offset); offset += 4;
            this.StringFieldEntry = buffer.readUInt32LE(offset); offset += 4;
            this.StringField = {};
            this.StringOffsetList = [];
            let position = offset;
            offset = this.StringFieldEntry;
            while (offset < this.StringFieldEntry + this.StringFieldSize) {
                let _offset = offset - this.StringFieldEntry;
                let result = ReadString(buffer, offset);
                offset = result.offset;
                this.StringField[_offset] = result.s;
                this.StringOffsetList.push(_offset);
            }
            offset = position;
        }
        if (this.Form == 0x1e) {
            this.NameOffset = offset;
            this.NameStart = buffer.readUInt32LE(offset); offset += 4;
        }

        this.Label = buffer.toString('utf-8', offset, offset + 4); offset += 4;
        let alrdBuffer = buffer.slice(offset, this.TableEntry); offset = this.TableEntry;
        let alrd = new ALRD(alrdBuffer, 0);
        this.Headers = alrd.Headers;
        this.Contents = [];
        for (let i = 0; i < this.Count; i++) {
            offset = this.TableEntry + this.Size * i;
            let row = {};
            for (let j = 0; j < this.Headers.length; j++) {
                let header = this.Headers[j];
                let v = null;
                if (header.Type == 1) {
                    v = buffer.readInt32LE(offset + header.Offset);
                }
                if (header.Type == 4) {
                    v = buffer.readFloatLE(offset + header.Offset);
                }
                if (header.Type == 5) {
                    v = buffer.readUInt8(offset + header.Offset);
                }
                if (header.Type == 0x20) {
                    let stringOffset = buffer.readUInt32LE(offset + header.Offset);
                    v = this.StringField[stringOffset];
                }
                row[header.NameEN] = v;
            }
            this.Contents.push(row);
        }
        if (this.NameStart !== undefined) {
            offset = this.NameStart;
            this.UnknownNames = buffer.readUInt32LE(offset); offset += 4;
            this.NameLength = buffer.readUInt8(offset); offset++;
            this.Name = buffer.toString('utf-8', offset, offset + this.NameLength); offset += this.NameLength;
        }
    }
    /**
     * 
     * @param {Array<String>} stringList 
     */
    GetStringField(stringList) {
        if (stringList === null) throw "该文件没有StringField";
        let bufferList = [];
        let offsetList = [];
        let offset = 0;
        for (let i = 0; i < stringList.length; i++) {
            offsetList.push(offset);
            let s = stringList[i].replace(/\\n/g, "\n") + "\0";
            let stringBuffer = Buffer.from(s, 'utf-8');
            bufferList.push(stringBuffer);
            offset += stringBuffer.length;
        }
        return {
            buffer: Buffer.concat(bufferList),
            offsetList: offsetList
        }
    }

    GetStringList() {
        let ss = [];
        if (this.StringField === undefined) return null;
        for (let key in this.StringField) {
            let s = this.StringField[key];
            s = s.replace(/\n/g, "\\n");
            ss.push(s);
        }
        return ss;
    }

    ReplaceStringList(replaceObject) {
        let ss = [];
        if (this.StringField === undefined) return null;
        let count = 0;
        for (let key in this.StringField) {
            let s = this.StringField[key];
            s = s.replace(/\n/g, "\\n");
            let replaceS = replaceObject[s];
            if (replaceS !== undefined) {
                s = replaceS;
                count++;
            }
            ss.push(s);
        }
        console.log("Replaced " + count);
        return ss;
    }
    /**
     * @param {String} path 
     */
    Package(path) {
        let replaceObject = readReplacementFile(fs.readFileSync(path, { encoding: 'utf-8' }));
        if (replaceObject === null) return this.RawBuffer;
        let newStringField = this.GetStringField(this.ReplaceStringList(replaceObject));
        let newOffsetList = newStringField.offsetList;
        //制作Offset变化Object
        let offsetChanges = {};
        if (this.StringOffsetList.length !== newOffsetList.length) throw "String数量错误";
        for (let i = 0; i < newOffsetList.length; i++) {
            offsetChanges[this.StringOffsetList[i]] = newOffsetList[i];
        }
        //取头、StringField、尾，计算长度。
        let size = 0;
        let head = this.RawBuffer.slice(0, this.StringFieldEntry);
        let stringField = newStringField.buffer;
        let tail = this.RawBuffer.slice(Align(this.StringFieldEntry + this.StringFieldSize, 4), this.RawBuffer.length);
        let alignStringFieldLength = Align(stringField.length, 4);
        size = head.length + alignStringFieldLength;
        size += tail.length;
        //头的部分要修改StringSize，0x20项的地址，如果有name的话还要修改name的地址。
        head.writeUInt32LE(alignStringFieldLength, this.StringFieldSizePosition);
        for (let i = 0; i < this.Count; i++) {
            let rowEntry = this.TableEntry + this.Size * i;
            for (let j = 0; j < this.Headers.length; j++) {
                let header = this.Headers[j];
                if (header.Type === 0x20) {
                    let offset = rowEntry + header.Offset;
                    let stringFieldOffset = head.readUInt32LE(offset);
                    let newStringFieldOffset = offsetChanges[stringFieldOffset];
                    if (newStringFieldOffset !== undefined) head.writeUInt32LE(newStringFieldOffset, offset);
                    else throw "没有该offset";
                }
            }
        }
        if (this.NameStart !== undefined) {
            let newNameStart = this.NameStart + (alignStringFieldLength - (this.NameStart - this.StringFieldEntry))
            head.writeUInt32LE(newNameStart, this.NameOffset);
        }

        let newBuffer = Buffer.alloc(size, 0);
        head.copy(newBuffer, 0, 0, head.length);
        stringField.copy(newBuffer, head.length, 0, stringField.length);
        tail.copy(newBuffer, head.length + alignStringFieldLength, 0, tail.length);
        return newBuffer;
    }

}

class ALAR {
    /**
     * 
     * @param {Buffer} buffer 
     * @param {Number} offset 
     */
    constructor(buffer, offset) {
        class Entry {
            constructor() {
                this.Index = 0;
                this.Unknown1 = 0;
                this.Address = 0;
                this.Offset = 0;
                this.Size = 0;
                this.Unknown2 = new Buffer(0);
                this.Name = "";
                this.Unknown3 = 0;
                this.Content = new Buffer(0);
                this.ParsedContent = new Object();
            }
        }
        this.Entry = Entry;
        this.Head = buffer.toString('utf-8', offset, offset + 4); offset += 4;
        this.Files = [];
        this.TocOffsetList = [];
        this.Vers = buffer.readUInt8(offset); offset++;
        this.Unknown = buffer.readUInt8(offset); offset++;
        if (this.Vers !== 2 && this.Vers !== 3) throw "ALAR版本错误";
        //this.Count = 0;
        //this.UnknownBytes = null;
        if (this.Vers === 2) {
            this.Count = buffer.readUInt16LE(offset); offset += 2;
            this.UnknownBytes = buffer.slice(offset, offset + 8); offset += 8;
        }
        if (this.Vers === 3) {
            this.Count = buffer.readUInt16LE(offset); offset += 2;
            this.Unknown1 = buffer.readUInt16LE(offset); offset += 2;
            this.Unknown2 = buffer.readUInt16LE(offset); offset += 2;
            this.UnknownBytes = buffer.slice(offset, offset + 4); offset += 4;
            this.DataOffset = buffer.readUInt16LE(offset); offset += 2;
            for (var i = 0; i < this.Count; i++) {
                this.TocOffsetList.push(buffer.readUInt16LE(offset)); offset += 2;
            }
            offset = Align(offset, 4);
        }
        let parseTocEntry = () => {
            let entry = new Entry();
            if (this.Vers === 2) {
                entry.Index = buffer.readUInt16LE(offset); offset += 2;
                entry.Unknown1 = buffer.readUInt16LE(offset); offset += 2;
                entry.Address = buffer.readUInt32LE(offset); offset += 4;
                entry.Size = buffer.readUInt32LE(offset); offset += 4;
                entry.Unknown2 = buffer.slice(offset, offset + 4); offset += 4;
                entry.Name = ReadString(buffer, entry.Address - 0x22).s;
                entry.Unknown3 = buffer.readUInt16LE(entry.Address - 0x02);
            }
            else {
                entry.Index = buffer.readUInt16LE(offset); offset += 2;
                entry.Unknown1 = buffer.readUInt16LE(offset); offset += 2;
                entry.Address = buffer.readUInt32LE(offset); offset += 4;
                entry.Size = buffer.readUInt32LE(offset); offset += 4;
                entry.Unknown2 = buffer.slice(offset, offset + 6); offset += 6;
                let result = ReadString(buffer, offset);
                offset = result.offset;
                entry.Name = result.s;
                offset = Align(offset, 4);
            }
            return entry;
        }

        for (var i = 0; i < this.Count; i++) {
            let entry = parseTocEntry();
            entry.Content = buffer.slice(entry.Address, entry.Size);
            this.Files.push(entry);
        }
        if (this.Vers === 2) this.DataOffsetByData = this.Files[0].Address - 0x22;
        if (this.Vers === 3) this.DataOffsetByData = this.Files[0].Address;

        console.log(this.Files);
    }
    /**
     * 
     * @param {String} path 
     */
    Package(path) {
        path = path + '/';
    }
}
/**
 * 
 * @param {String} text 
 */
function readReplacementFile(text) {
    let obj = {}
    let row = text.split('\r\n');
    let count = 0;
    for (let i = 0; i < row.length; i++) {
        let col = row[i].split('\t');
        if (col.length == 2) {
            count++;
            obj[col[0]] = col[1];
        }
    }
    console.log("Read Row ", count);
    return obj;
}

/**
 *  @param {Buffer} buffer
 *  @param {Number} offset
 */
function parseObject(buffer, offset) {
    let head = buffer.toString('utf-8', offset, offset + 4);
    //console.log(head);
    switch (head) {
        case "ALLZ":
            return parseObject((new ALLZ(buffer, offset)).Dst, 0);
        case "ALTB":
            return new ALTB(buffer, offset);
        case "ALAR":
            return new ALAR(buffer, offset);
        default:
            console.log("不支持的文件头 ： " + head);
            return null;
    }
}

/**
 * 
 * @param {Buffer} buffer 
 * @param {Number} offset 
 */
function parse(buffer) {
    let result = parseObject(buffer, 0);
    return result;
}


function mkdir(dirArray, max) {
    if (max === undefined) max = dirArray.length;
    let nowDir = ".";
    for (let i = 0; i < max; i++) {
        nowDir += "/" + dirArray[i];
        if (!fs.existsSync(nowDir)) {
            fs.mkdirSync(nowDir);
        }
    }
}

module.exports = {
    createServer: function () {
        let app = express();
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        })
        app.use(function (req, res) {
            let headers = req.headers;
            headers.host = "assets.millennium-war.net";
            //设置代理
            let options = {
                url: 'http://assets.millennium-war.net' + req.path,
                headers: headers,
                encoding: null
            };
            if (ProxyEnable === true && ProxyIsSocks5 === true) {
                options.agentClass = Agent;
                options.agentOptions = {
                    socksHost: ProxyHost,
                    socksPort: ProxyPort
                }
            }
            if (ProxyEnable === true && ProxyIsSocks5 === false) {
                options.proxy = `http://${ProxyHost}:${ProxyPort}`
            }
            //console.log(options);
            let fullPathList = ("cache" + req.path).split('/');
            let requestFileName = FileList[req.path];
            if (req.path.indexOf("18cbbe1a57873ab0047629f77cbbcf86") !== -1) {
                requestFileName = "MainFont.aft";
            }
            let translateFileName = TranslateFileList[requestFileName]
            //文件热封装
            let translateFilePath = "translate/" + translateFileName;
            if (fs.existsSync(translateFilePath)) {
                console.log(requestFileName, "modify by Server");
                //Font文件直接回传
                if (requestFileName === "MainFont.aft") {
                    res.send(fs.readFileSync(translateFilePath))
                    return;
                }
                let result;
                //检查是否有该文件

                if (!fs.existsSync("cache" + req.path)) {
                    mkdir(fullPathList, fullPathList.length - 1);
                    options.gzip = true;
                    request(options, (err, response, body) => {
                        result = parse(body);
                        //res.send(result.Package(translateFilePath));
                        fs.writeFileSync("cache/" + requestFileName, body);
                        res.send(body);
                    })
                    //.pipe(fs.createWriteStream("cache" + req.path));
                }
                else {
                    let rawBuffer = fs.readFileSync("cache" + req.path);
                    result = parse(rawBuffer);
                    res.send(result.Package(translateFilePath));
                }
            }
            else {
                request(options, (err, res, body) => {
                    if (body === undefined) console.log("Error on " + req.path);
                    //console.log(req.path,res.headers['content-encoding'],res.headers['content-length'],body.length);
                }).pipe(res);
            }
        });
        var server = http.createServer(app);
        server.on('error', (e) => {
            console.log(e);
        });
        server.listen('19980', function () {
            console.log('listen at 19980');
        });
    },
    setFileList: function (fileList) {
        FileList = fileList;
    },
    setProxy: function (enable, isSocks5, host, port) {
        ProxyEnable = enable;
        ProxyIsSocks5 = isSocks5;
        if (enable) {
            ProxyHost = host;
            ProxyPort = port;
        }
    }
}