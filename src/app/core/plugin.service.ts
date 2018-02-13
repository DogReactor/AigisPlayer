import { Injectable } from '@angular/core';
import { WebviewTag, WebContents } from 'electron'
import { Xml2json } from '../decipher/xml2json'
import { ElectronService } from './electron.service'
import * as fs from 'fs';
import * as Rx from 'rxjs/Rx';

export class Plugin {
    public path = '';
    public pluginName = '';
    public author = '';
    public version = '';
    public description = '';
    public entry = '';
    public windowOption = {};
}
class ActivePlugin {
    public Plugin: Plugin;
    public WebView: WebContents;
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
    private responseDataList: ResponseData[] = [];
    public PluginList: Plugin[] = [];
    private activePluginList: ActivePlugin[] = [];
    public listUpdate = new Rx.Subject();
    constructor(
        private electronService: ElectronService
    ) {
        // const fs = electronService.fs;
        fs.readdir('plugins', (err, files) => {
            if (err) {
                fs.mkdirSync('plugins');
                return;
            }
            files.forEach((value, index) => {
                let data;
                try { data = fs.readFileSync('./plugins/' + value + '/manifest.json', 'utf8'); } catch (e) { return; }
                try {
                    const obj = JSON.parse(data);
                    obj.path = value;
                    this.PluginList.push(Object.assign(new Plugin, obj));
                } catch (e) {
                    return;
                }
            });
            this.listUpdate.next(true);
        });
        console.log(this.PluginList);
    }
    AddResponse(data: Object, path: string) {
        path = path.slice(path.lastIndexOf('/') + 1);
        data = Xml2json(data);
        console.log(data, path);
        this.responseDataList.push(new ResponseData(data, path));

        for (let i = 0; i < this.activePluginList.length; i++) {
            if (this.activePluginList[i]) {
                // TODO:按照列表来
                this.activePluginList[i].WebView.send('message', path, data);
            }
        }
    }
    ClearResponseList() {
        this.responseDataList = [];
    }
    Register() {

    }
    Unregister() {

    }

}
