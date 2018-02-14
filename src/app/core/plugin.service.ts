import { Injectable } from '@angular/core';
import { WebviewTag, WebContents, BrowserWindow } from 'electron'
import { Xml2json } from '../decipher/xml2json'
import { ElectronService } from './electron.service'
import { pluginEvent } from './pluginEventList'
import * as fs from 'fs';
import * as Rx from 'rxjs/Rx';


export class Plugin {
    public path = '';
    public pluginName = '';
    public author = '';
    public version = '';
    public description = '';
    public entry = '';
    public embed = false;
    public windowOption = {};
}
class ActivePlugin {
    public Plugin: Plugin;
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
    private activePluginList: ActivePlugin[] = [];
    public ListUpdate = new Rx.Subject();
    public NewEmbedPlugin = new Rx.Subject();
    public SwitchEmbedPlugin = new Rx.Subject<string>();
    private protoablePath: string;
    private pluginsPath: string;
    constructor(
        private electronService: ElectronService
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
                    this.PluginList.push(Object.assign(new Plugin, obj));
                } catch (e) {
                    return;
                }
            });
            this.ListUpdate.next(true);
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
            for (let i = 0; i < this.activePluginList.length; i++) {
                this.activePluginList[i] && this.activePluginList[i].WebContent.send(channel, data)
            }
        }
    }
    ClearResponseList() {
        this.responseDataList = {};
    }
    ActivePlugin(plugin: Plugin) {
        if (plugin.embed) {
            this.activeEmbedPlugin(plugin);
        } else {
            this.activeStandAlonePlugin(plugin);
        }
    }

    private activeEmbedPlugin(plugin: Plugin) {

    }
    DeactiveEmbedPlugin(id: string) {

    }
    private activeStandAlonePlugin(plugin: Plugin) {
        let activedPlugin = this.activePluginList.find(v => {
            if (v) {
                return v.Plugin === plugin
            } else {
                return false;
            }
        });
        if (activedPlugin) {
            activedPlugin.BrowserWindow.focus();
            return;
        }
        activedPlugin = new ActivePlugin();
        activedPlugin.Embed = false;
        activedPlugin.Plugin = plugin;
        const dirname = this.protoablePath ? this.protoablePath : fs.realpathSync('.');
        const url = require('url').format({
            protocol: 'file',
            slashes: true,
            pathname: require('path').join(dirname, 'plugins', plugin.path, plugin.entry)
        });
        activedPlugin.BrowserWindow = this.electronService.CreateBrowserWindow(url, plugin.windowOption);
        activedPlugin.WebContent = activedPlugin.BrowserWindow.webContents;
        const index = this.activePluginList.push(activedPlugin) - 1;
        activedPlugin.BrowserWindow.on('close', () => {
            // 释放灵魂
            delete this.activePluginList[index];
            this.electronService.ipcMain.removeListener('response-packages', listener);
            this.electronService.ipcMain.removeListener('response-packages-sync', listenerSync);
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
