import { ElectronService } from './electron.service'
import { Plugin } from './plugin.service'
import { WebContents, webContents } from 'electron';
import { GameService } from './game.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
const md5 = crypto.createHash('md5');
export class PluginHelper {
    constructor(private electronService: ElectronService, private gameSerivce: GameService, private plugin: Plugin) {
    }
    onMessage(callback: (msg: any, sendResponse?: any) => void) {
        const asyncChannel = `${this.plugin.id}`
        this.electronService.ipcMain.on(asyncChannel, (event, msg) => {
            const salt = msg.salt;
            const message = msg.message;
            const sendResponse = (message) => {
                if (typeof message === 'object') {
                    message = JSON.parse(JSON.stringify(message));
                }
                const channel = `${this.plugin.id}-${salt}`;
                event.sender.send(channel, message);
            }
            callback(message, sendResponse);
        });

        const syncChannel = `${this.plugin.id}-sync`
        this.electronService.ipcMain.on(syncChannel, (event, msg) => {
            event.returnValue = callback(msg);
        });
    }
    sendMessage(message, callback?: (message: any) => void) {
        const channel = `${this.plugin.id}`
        const salt = crypto.createHash('md5').update(Math.random().toString()).digest('hex');
        const obj = {
            salt: salt,
            message: message
        }
        const replyChannel = `${this.plugin.id}-${salt}`;
        this.electronService.ipcMain.once(replyChannel, (event, message) => {
            if (typeof callback === 'function') {
                callback(message);
            } else {
                console.log(callback)
            }
        });
        this.gameSerivce.WebView
        if (this.gameSerivce.WebView) {
            this.gameSerivce.WebView.send(channel, obj);
        }
    }
    insertCssFileToGame(path, dirname?) {
        if (dirname) {
            dirname = dirname.replace(/\\/g, '/');
        } else { dirname = '' }
        let css = fs.readFileSync(path, 'utf8');
        css = css.replace(/\s{2,10}/g, ' ').trim()
        css = css.replace(/chrome-extension:\/\/__MSG_@@extension_id__/g, dirname);
        this.gameSerivce.WebView.insertCSS(css);
    }
    insertCssToGame(css) {
        this.gameSerivce.WebView.insertCSS(css);
    }
}

export class PluginHelperForRender {
    constructor() {

    }
}
