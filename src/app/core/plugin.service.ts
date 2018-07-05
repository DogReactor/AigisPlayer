import { Injectable } from '@angular/core';
import { WebviewTag, WebContents, BrowserWindow, ipcRenderer } from 'electron'
import { Xml2json } from '../decipher/xml2json'
import { ElectronService } from './electron.service'
import { pluginEvent } from './pluginEventList'
import * as fs from 'fs';
import * as Rx from 'rxjs/Rx';
import * as path from 'path';
import * as crypto from 'crypto'
import { PluginHelper } from './pluginHelper'
import { GameService } from './game.service';
import { HttpClient } from '@angular/common/http'
import { GlobalConfig } from '../global/config'
import * as rimraf from 'rimraf'
import * as request from 'request'
import { ElMessageService } from 'element-angular';
import { GlobalStatusService } from '../global/globalStatus.service';

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
    public needRestart = false;
    public installing = false;
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
    public RemotePluginList: Plugin[];
    public ListUpdate = new Rx.Subject();
    public NewEmbedPlugin = new Rx.Subject();
    public SwitchEmbedPlugin = new Rx.Subject<string>();
    private protoablePath: string;
    private pluginsPath: string;
    constructor(
        private electronService: ElectronService,
        private gameService: GameService,
        private http: HttpClient,
        private message: ElMessageService,
        private globalStatusService: GlobalStatusService
    ) {
        // const fs = electronService.fs;
        this.protoablePath = window.require('electron').remote.process.env.PORTABLE_EXECUTABLE_DIR;
        this.pluginsPath = this.protoablePath ?
            this.protoablePath + '/plugins' : path.join(this.electronService.APP.getPath('userData'), 'plugins');
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
                    if (obj.background) {
                        obj.background = path.join(this.pluginsPath, obj.path, obj.background).replace(/\\/g, '/');
                    }
                    if (obj.inject) {
                        obj.inject = path.join(this.pluginsPath, obj.path, obj.inject).replace(/\\/g, '/');
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
                    game: this.globalStatusService.GlobalStatusStore.Get('CurrentGame').Value
                }
            });
        });
    }


    async getPluginListFromRemote() {
        if (this.RemotePluginList) {
            return this.RemotePluginList;
        } else {
            const url = `http://${GlobalConfig.Host}/plugins`;
            this.RemotePluginList = await this.http.get<Plugin[]>(url).toPromise();
            return this.RemotePluginList;
        }
    }
    async installPluginFromRemote(plugin: Plugin) {
        if (plugin.needRestart !== false) {
            const zipPromise = () => {
                return new Promise((resolve, reject) => {
                    const url = `http://${GlobalConfig.Host}/assets/plugins/${plugin.path}/${plugin.version}/${plugin.path}.zip`
                    const pluginPath = path.join(this.pluginsPath, plugin.path);
                    const salt = crypto.createHash('md5').update(Math.random().toString()).digest('hex');
                    ipcRenderer.send('installPlugin', {
                        url: url,
                        pluginPath: pluginPath,
                        salt: salt
                    });
                    ipcRenderer.once(`plugin-install-error-${salt}`, (e) => {
                        reject(e)
                    });
                    ipcRenderer.once(`plugin-install-success-${salt}`, () => {
                        resolve();
                    })
                })
            }
            try {
                if (plugin.installing === true) {
                    return false;
                }
                plugin.installing = true;
                await zipPromise();
                plugin.needRestart = true;
                // 提示下载成功
                this.message['success'](`插件：${plugin.pluginName} 安装成功`)
                return true;
            } catch (e) {
                // 提示插件下载失败
                plugin.installing = false;
                this.message['error'](`插件：${plugin.pluginName} 安装失败`)
                return false;
            }


        }
        return false;
    }
    async removePlugin(plugin: Plugin) {
        if (plugin.needRestart !== true) {
            if (plugin.activedWindow) {
                plugin.activedWindow.BrowserWindow.close();
            }
            const rimrafPromise = (path) => {
                return new Promise((resolve, reject) => {
                    rimraf(path, () => {
                        resolve();
                    });
                })
            }
            await rimrafPromise(path.join(this.pluginsPath, plugin.path));
            plugin.needRestart = true;
            const index = this.PluginList.findIndex((v) => {
                if (v.path === plugin.path) {
                    return true;
                }
            })
            this.PluginList.splice(index, 1);
            return true;
        } else { return false; }
    }
    async updatePlugin(plugin: Plugin) {
        if (await this.removePlugin(plugin)) {
            this.installPluginFromRemote(plugin);
            return true;
        }
        return false;
    }
    loadBackgroundScript() {
        this.PluginList.forEach((v) => {
            if (v.background === '') { return; }
            console.log(v.background);
            if (fs.existsSync(v.background)) {
                const script = v.backgroundObject = global['require'](`${v.background}`);
                if (!script || !script.run) { return; }
                script.run(new PluginHelper(this.electronService, this.gameService, v));
            }
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
        const url = require('url').format({
            protocol: 'file',
            slashes: true,
            pathname: path.join(this.pluginsPath, plugin.path, plugin.entry)
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
