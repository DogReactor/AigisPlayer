import { ElectronService } from './electron.service'
import { Plugin } from './plugin.service'
import { WebContents, webContents } from 'electron';
import { GameService } from './game.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
const md5 = crypto.createHash('md5');
export class PluginHelper {
    constructor(private electronService: ElectronService, private gameService: GameService, private plugin: Plugin) {
    }
    on(event, callback: (msg?: any) => void) {
        // EventList
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
        if (this.plugin.activedWindow) {
            try {
                this.plugin.activedWindow.WebContent.send(channel, obj);
            } catch {

            }
        }
        if (this.gameService.WebView) {
            this.gameService.WebView.send(channel, obj);
        }
    }
    insertCssFileToGame(path, dirname?) {
        if (dirname) {
            dirname = dirname.replace(/\\/g, '/');
        } else { dirname = '' }
        let css = fs.readFileSync(path, 'utf8');
        css = css.replace(/\s{2,10}/g, ' ').trim()
        css = css.replace(/chrome-extension:\/\/__MSG_@@extension_id__/g, dirname);
        this.gameService.WebView.insertCSS(css);
    }
    insertCssToGame(css) {
        this.gameService.WebView.insertCSS(css);
    }
    createWindow(file, option) {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const currentWindow = require('electron').remote.getCurrentWindow();
        const path = require('path');
        const url = require('url').format({
            protocol: 'file',
            slashes: true,
            pathname: file
        });
        if (!option['webPreferences']) { option['webPreferences'] = {} }
        option['webPreferences']['preload'] = path.join(__dirname, './assets/js/pluginWindowPreload.js');
        option.parent = currentWindow;
        const win = new BrowserWindow(option);
        win.loadURL(url);
        win.webContents.on('dom-ready', (event) => {
            event.sender.send('plugin-info', this.plugin);
        });
        return win;
    }
}

export class PluginHelperForRender {
    constructor() {

    }
}
