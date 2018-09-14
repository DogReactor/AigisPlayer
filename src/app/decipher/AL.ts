import { BufferReader, Origin } from './BufferReader';
import { bind1 } from '../../../node_modules/@angular/core/src/render3/instructions';
import * as fs from 'fs';
import * as cp from 'child_process';
import * as path from 'path'

const dataDir = './tools/AigisRevealTools/GameAssets';
const ALTools = './tools/AigisRevealTools/AL.bat';

function parseObject(filename: string, cachePath:string) {


    let ls = cp.spawn(ALTools, [filename, cachePath], {});
    ls.stdout.on('data', function (data) {
        // 处理文件名、路径
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    ls.on('exit', function (code) {
        if (code === 0) {
            console.log('Decrypt ' + filename + ' successed');
            fs.unlink(cachePath, (err) => {
                if (err) throw err;
            });
        }
        else {
            console.log('Failed to decrypt ' + filename, ' ALTools exited with code ' + code);
        }
    });

}

export function parseAL(filename:string, cachePath:string) {
    return parseObject(filename, cachePath);
}


