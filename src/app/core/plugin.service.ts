import { Injectable } from '@angular/core';
import { WebviewTag, WebContents, BrowserWindow } from 'electron'
import { Xml2json } from '../decipher/xml2json'
import { ElectronService } from './electron.service'
import { pluginEvent } from './pluginEventList'
import * as fs from 'fs';
import * as Rx from 'rxjs/Rx';
import * as path from 'path';
import * as crypto from 'crypto'
import { PluginHelper } from './pluginHelper'
import { GameService } from './game.service';


export class Plugin {
    public path = '';
    public pluginName = '';
    public author = '';
    public version = '';
    public description = '';
    public entry = '';
    public background = '';
    public inject = '';
    public embed = false;
    public windowOption = {};
    public id = '';
    public activedWindow: ActivePlugin = null;
    public backgroundObject = null;
    public game = [];
}
class ActivePlugin {
    public WebContent: WebContents;
    public BrowserWindow: BrowserWindow;
    public Embed: boolean;
    public ID: string;
}
class ResponseData {
    public Path = '';
    public Data = {};
    constructor(data: Object, path: string) {
        this.Path = path;
        this.Data = data;
    }
}

@Injectable()
export class PluginService {
    private responseDataList = {};
    public PluginList: Plugin[] = [];
    public ListUpdate = new Rx.Subject();
    public NewEmbedPlugin = new Rx.Subject();
    public SwitchEmbedPlugin = new Rx.Subject<string>();
    private protoablePath: string;
    private pluginsPath: string;
    constructor(
        private electronService: ElectronService,
        private gameService: GameService
    ) {
        // const fs = electronService.fs;
        this.protoablePath = window.require('electron').remote.process.env.PORTABLE_EXECUTABLE_DIR;
        this.pluginsPath = this.protoablePath ? this.protoablePath + '/plugins' : './plugins';
        fs.readdir(this.pluginsPath, (err, files) => {
            if (err) {
                fs.mkdirSync(this.pluginsPath);
                return;
            }
            files.forEach((value, index) => {
                let data;
                try { data = fs.readFileSync(`${this.pluginsPath}/${value}/manifest.json`, 'utf8'); } catch (e) { return; }
                try {
                    const obj = JSON.parse(data);
                    obj.path = value;
                    obj.id = crypto.createHash('md5').update(Math.random().toString()).digest('hex')
                    // obj.id = value;
                    const dirname = this.protoablePath ? this.protoablePath : fs.realpathSync('.');
                    if (obj.background) {
                        obj.background = path.join(dirname, 'plugins', obj.path, obj.background).replace(/\\/g, '/');
                    }
                    if (obj.inject) {
                        obj.inject = path.join(dirname, 'plugins', obj.path, obj.inject).replace(/\\/g, '/');
                    }
                    this.PluginList.push(Object.assign(new Plugin, obj));
                } catch (e) {
                    console.log(e);
                    return;
                }
            });
            this.ListUpdate.next(true);
            this.loadBackgroundScript();

            this.electronService.ipcMain.on('require-plugins', (event, msg) => {
                const pluginList = this.PluginList.map(v => {
                    const r = {};
                    for (const key in v) {
                        if (key !== 'activedWindow' && key !== 'backgroundObject') {
                            r[key] = v[key];
                        }
                    }
                    return r;
                })

                event.returnValue = {
                    pluginList: pluginList,
                    game: this.gameService.CurrentGame
                }
            });
        });
    }

    loadBackgroundScript() {
        this.PluginList.forEach((v) => {
            if (v.background === '') { return; }
            const script = v.backgroundObject = global['require'](`${v.background}`);
            if (!script || !script.run) { return; }
            script.run(new PluginHelper(this.electronService, this.gameService, v));
        });
    }

    AddResponse(data: Object, path: string) {
        path = path.slice(path.lastIndexOf('/') + 1);
        data = Xml2json(data);
        data = data['DA'] || data;
        const channel = pluginEvent[path];
        if (channel) {
            this.responseDataList[channel] = this.responseDataList[channel] || [];
            this.responseDataList[channel].push(data);
            this.PluginList.forEach((v) => {
                if (v.activedWindow) {
                    v.activedWindow.WebContent.send(channel, data);
                }
                if (v.backgroundObject) {
                    v.backgroundObject['newGameResponse'](channel, data);
                }
            })
        }
    }
    ClearResponseList() {
        this.responseDataList = {};
    }
    ActivePlugin(plugin: Plugin) {
        if (plugin.entry !== '') {
            if (plugin.embed) {
                this.activeEmbedPlugin(plugin);
            } else {
                this.activeStandAlonePlugin(plugin);
            }
        }
    }

    private activeEmbedPlugin(plugin: Plugin) {

    }
    DeactiveEmbedPlugin(id: string) {

    }
    private activeStandAlonePlugin(plugin: Plugin) {
        if (plugin.activedWindow) {
            plugin.activedWindow.BrowserWindow.focus();
            return;
        }
        plugin.activedWindow = new ActivePlugin();
        plugin.activedWindow.Embed = false;
        const dirname = this.protoablePath ? this.protoablePath : fs.realpathSync('.');
        const url = require('url').format({
            protocol: 'file',
            slashes: true,
            pathname: path.join(dirname, 'plugins', plugin.path, plugin.entry)
        });
        if (!plugin.windowOption['webPreferences']) { plugin.windowOption['webPreferences'] = {} }
        plugin.windowOption['webPreferences']['preload'] = path.join(__dirname, './assets/js/pluginWindowPreload.js');
        plugin.activedWindow.BrowserWindow = this.electronService.CreateBrowserWindow(url, plugin.windowOption);
        plugin.activedWindow.WebContent = plugin.activedWindow.BrowserWindow.webContents;
        plugin.activedWindow.WebContent.on('dom-ready', (event) => {
            event.sender.send('plugin-info', plugin);
        });
        plugin.activedWindow.BrowserWindow.on('close', () => {
            // 释放灵魂
            this.electronService.ipcMain.removeListener('response-packages', listener);
            this.electronService.ipcMain.removeListener('response-packages-sync', listenerSync);
            plugin.activedWindow = null;
        });
        const listener = (event, arg: string) => {
            const packages = this.responseDataList[arg] || [];
            event.sender.send('response-packages', packages);
        };
        const listenerSync = (event, arg: string) => {
            const packages = this.responseDataList[arg] || [];
            event.returnValue = packages;
        }
        this.electronService.ipcMain.on('response-packages', listener);
        this.electronService.ipcMain.on('response-packages-sync', listenerSync);
    }
}

/*
ap 本地版
ap IPC版


plugin - activePluginObject -webContent,info xxxx

send、on封装

channel `webContentid-channelName'

右侧Plugin条

浮动plugin不销毁

内嵌plugin在切换时销毁
独立plugin在关闭时销毁

在激活时传入('页面启动时做的事')
页面通过(on-load)事件来获取
*/


// 注册插件
// pluginHelper可以提供一个消息代理
// background通过消息代理来监听

