import { BufferReader, Origin } from './BufferReader';

interface AL {
    Buffer: Buffer;
    Head: string;
    Package(path?: string, flag?: string);
}

class DefaultAL implements AL {
    Buffer: Buffer;
    Head: string;
    constructor(buffer: Buffer) {
        this.Buffer = buffer;
        this.Head = buffer.toString('utf-8', 0, 4);
    }
    Package() {
        return this.Buffer;
    }
}

class ALLZ implements AL {
    Buffer: Buffer;
    Head: string;
    Vers: number;
    MinBitsLength: number;
    MinBitsOffset: number;
    MinBitsLiteral: number;
    DstSize: number;
    Dst: Buffer;
    Size: 0;
    constructor(buffer: Buffer) {
        const self = this;
        this.Buffer = buffer;
        const br = new BufferReader(buffer);
        this.Head = br.ReadString(4);
        this.Vers = br.ReadByte();
        this.MinBitsLength = br.ReadByte();
        this.MinBitsOffset = br.ReadByte();
        this.MinBitsLiteral = br.ReadByte();
        this.DstSize = br.ReadDword();
        this.Dst = new Buffer(this.DstSize);
        this.Dst.fill(0);
        this.Size = 0;
        let dstOffset = 0;

        copyLiteral(readControlLiteral());
        let wordOffset = readControlOffset();
        let wordLength = readControlLength();
        let literalLength = 0;

        let finishFlag = 'overflow';

        while (!br.Overflow()) {
            if (dstOffset + wordLength >= this.DstSize) {
                finishFlag = 'word';
                break;
            }
            if (br.ReadBit() === 0) {
                literalLength = readControlLiteral();
                if (dstOffset + wordLength + literalLength >= this.DstSize) {
                    finishFlag = 'literal';
                    break;
                }
                copyWord(wordOffset, wordLength);
                copyLiteral(literalLength);
                wordOffset = readControlOffset();
                wordLength = readControlLength();
            } else {
                copyWord(wordOffset, wordLength);
                wordOffset = readControlOffset();
                wordLength = readControlLength();
            }
        }
        switch (finishFlag) {
            case 'word':
                copyWord(wordOffset, wordLength);
                break;
            case 'literal':
                copyWord(wordOffset, wordLength);
                copyLiteral(literalLength);
                break;
            case 'overflow':
                throw 'Overflow in ALLZ';
        }
        function readControl(minBits: number) {
            const u = br.ReadUnary();
            const n = br.ReadBits(u + minBits);
            if (u > 0) {
                return n + (((1 << u) - 1) << minBits);
            } else {
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

        function copyWord(offset: number, length: number) {
            let trueOffset = offset;
            for (let i = 0; i < length; i++) {
                if (offset < 0) {
                    trueOffset = dstOffset + offset;
                }
                self.Dst.writeUInt8(self.Dst[trueOffset], dstOffset); dstOffset++;
            }
        }
        function copyLiteral(control: number) {
            br.Copy(self.Dst, dstOffset, control); dstOffset += control;
        }
    }
    Package() {
        return this.Buffer;
    }
}

class ALRD {
    Head: string;
    Vers: number;
    Count: number;
    Size: number;
    Headers: ALRD.Header[];
    Buffer: Buffer;
    constructor(buffer: Buffer) {
        this.Buffer = buffer;
        const br = new BufferReader(buffer);
        this.Head = br.ReadString(4);
        if (this.Head !== 'ALRD') {
            throw 'Not a ALRD';
        }
        this.Vers = br.ReadWord();
        this.Count = br.ReadWord();
        this.Size = br.ReadWord();
        this.Headers = [];
        for (let i = 0; i < this.Count; i++) {
            const header = new ALRD.Header();
            header.Offset = br.ReadWord();
            header.Type = br.ReadByte();
            const emptyLength = br.ReadByte();
            const lengthEN = br.ReadByte();
            const lengthJP = br.ReadByte();
            header.NameEN = br.ReadString();
            header.NameJP = br.ReadString();
            br.Align(4);
            br.Seek(emptyLength, Origin.Current);
            br.Align(4);
            this.Headers.push(header);
        }
    }
}
module ALRD {
    export class Header {
        Offset = 0;
        Type = 0;
        NameEN = '';
        NameJP = '';
    }
}

class ALTB implements AL {
    Buffer: Buffer;
    Head: string;
    Vers: number;
    Form: number;
    Count: number;
    Unknown1: number;
    TabelEntry: number;
    NameStartAddressOffset: number;
    NameStartAddress: number;
    UnknownNames: number;
    NameLength: number;
    Name: string;
    Size: number;
    StringFieldSizePosition: number;
    StringFieldSize: number;
    StringFieldEntry: number;
    Label: string;
    StringField = {};
    StringOffsetList = [];
    Headers: ALRD.Header[] = [];
    Contents = [];
    constructor(buffer: Buffer) {
        this.Buffer = buffer;
        const br = new BufferReader(buffer);
        this.Head = br.ReadString(4);
        this.Vers = br.ReadByte();
        this.Form = br.ReadByte();
        this.Count = br.ReadWord();
        this.Unknown1 = br.ReadWord();
        this.TabelEntry = br.ReadWord();
        this.Size = br.ReadDword();
        if (this.Form === 0x14 || this.Form === 0x1e) {
            this.StringFieldSizePosition = br.Position;
            this.StringFieldSize = br.ReadDword();
            this.StringFieldEntry = br.ReadDword();
            this.StringField = {};
            this.StringOffsetList = [];

            const nowPosition = br.Position;
            br.Seek(this.StringFieldEntry, Origin.Begin);
            while (br.Position < this.StringFieldEntry + this.StringFieldSize) {
                const _offset = br.Position - this.StringFieldEntry;
                const s = br.ReadString();
                this.StringField[_offset] = s;
                this.StringOffsetList.push(_offset);
            }
            br.Seek(nowPosition, Origin.Begin);
        }
        if (this.Form === 0x1e) {
            this.NameStartAddressOffset = br.Position;
            this.NameStartAddress = br.ReadDword();
        }
        this.Label = br.ReadString(4);
        const alrdBuffer = br.ReadBytes(this.TabelEntry - br.Position);
        br.Seek(this.TabelEntry, Origin.Begin);
        const alrd = new ALRD(alrdBuffer);
        this.Headers = alrd.Headers;
        for (let i = 0; i < this.Count; i++) {
            br.Seek(this.TabelEntry + this.Size * i, Origin.Begin);
            const row = {};
            for (let j = 0; j < alrd.Headers.length; j++) {
                const header = this.Headers[i];
                const offset = br.Position;
                let v = null;
                switch (header.Type) {
                    case 1:
                        v = buffer.readInt32LE(offset + header.Offset);
                        break;
                    case 4:
                        v = buffer.readFloatLE(offset + header.Offset);
                        break;
                    case 5:
                        v = buffer.readUInt8(offset + header.Offset);
                        break;
                    case 0x20:
                        const stringOffset = buffer.readUInt32LE(offset + header.Offset);
                        v = this.StringField[stringOffset];
                        break;
                }
                row[header.NameEN] = v;
            }
            this.Contents.push(row);
        }
        if (this.NameStartAddress !== undefined) {
            br.Seek(this.NameStartAddress, Origin.Begin);
            this.UnknownNames = br.ReadDword();
            this.NameLength = br.ReadByte();
            this.Name = br.ReadString(this.NameLength);
        }
    }
    Package(path: string) {

    }
}

class ALAR implements AL {
    Buffer: Buffer;
    Head: string;
    Fiels: ALAR.Entry[] = [];
    TocOffsetList = [];
    Vers: number;
    Unknown: number;
    Count: number;
    Unknown1: number;
    Unknown2: number;
    UnknownBytes: Buffer;
    DataOffset: number;
    DataOffsetByData: number;
    constructor(buffer: Buffer) {
        this.Buffer = buffer;
        const br = new BufferReader(buffer);
        this.Head = br.ReadString(4);
        this.Fiels = [];
        this.TocOffsetList = [];
        this.Vers = br.ReadByte();
        this.Unknown = br.ReadByte();
        const self = this;
        if (this.Vers !== 2 && this.Vers !== 3) {
            throw 'ALAR VERSION ERROR';
        }
        if (this.Vers === 2) {
            this.Count = br.ReadWord();
            this.UnknownBytes = br.ReadBytes(8);
        }
        if (this.Vers === 3) {
            this.Count = br.ReadWord();
            this.Unknown1 = br.ReadWord();
            this.Unknown2 = br.ReadWord();
            this.UnknownBytes = br.ReadBytes(4);
            this.DataOffset = br.ReadWord();
            for (let i = 0; i < this.Count; i++) {
                this.TocOffsetList.push(br.ReadWord());
            }
        }
        br.Align(4);
        for (let i = 0; i < this.Count; i++) {
            const entry = parseTocEntry();
            entry.Content = parseObject(buffer.slice(entry.Address, entry.Address + entry.Size));
            this.Fiels.push(entry);
        }
        if (this.Vers === 2) {
            this.DataOffsetByData = this.Fiels[0].Address - 0x22;
        }
        if (this.Vers === 3) {
            this.DataOffsetByData = this.Fiels[0].Address;
        }
        function parseTocEntry() {
            const entry = new ALAR.Entry();
            if (self.Vers === 2) {
                entry.Index = br.ReadWord();
                entry.Unknown1 = br.ReadWord();
                entry.Address = br.ReadDword();
                entry.Size = br.ReadDword();
                entry.Unknown2 = br.ReadBytes(4);
                const p = br.Position;
                br.Seek(entry.Address - 0x22, Origin.Begin);
                entry.Name = br.ReadString();
                br.Seek(entry.Address - 0x02, Origin.Begin);
                entry.Unknown3 = br.ReadWord();
                br.Seek(p, Origin.Begin);
            } else {
                entry.Index = br.ReadWord();
                entry.Unknown1 = br.ReadWord();
                entry.Address = br.ReadDword();
                entry.Size = br.ReadDword();
                entry.Unknown2 = br.ReadBytes(4);
                entry.Name = br.ReadString();
                br.Align(4);
            }
            return entry;
        }
    }
    Package(path: string) {

    }
}
module ALAR {
    export class Entry {
        Index = 0;
        Unknown1 = 0;
        Address = 0;
        Offset = 0;
        Size = 0;
        Unknown2 = new Buffer(0);
        Name = '';
        Unknown3 = 0;
        Content: AL;
        ParsedContent = new Object();
    }
}

function parseObject(buffer: Buffer) {
    const type = buffer.toString('utf-8', 0, 4);
    let r: AL;
    switch (type) {
        case 'ALLZ':
            const lz = new ALLZ(buffer);
            try {
                r = parseObject(lz.Dst);
            } catch {
                r = lz;
            }
            break;
        case 'ALTB':
            r = new ALTB(buffer);
            break;
        case 'ALAR':
            r = new ALAR(buffer);
            break;
        default:
            console.log('Not Support');
            r = new DefaultAL(buffer);
            break;
    }
    return r;
}

export function parseAL(buffer: Buffer) {
    return parseObject(buffer);
}


