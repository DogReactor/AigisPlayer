import { Injectable } from '@angular/core';
import { ElectronService } from '../core/electron.service'

export class Proxy {
    Host: String = '';
    Port: String = '';
    Socks5: Boolean = false;
    Enabled: Boolean = false;
}

@Injectable()
export class GlobalSettingService {
    public GlobalSetting: any = {
        proxy: new Proxy()
    }

    constructor(private electronService: ElectronService) {
        // 在这里读取Config
        if (window.localStorage.getItem('globalSetting')) {
            try {
                this.GlobalSetting = JSON.parse(window.localStorage.getItem('globalSetting'));
                console.log(this.GlobalSetting);
            } catch { }
        }
        // 给globalSetting的所有成员加上getter和setter，方便调取saveConfigure
        for (const key in this.GlobalSetting) {
            if (this.GlobalSetting.hasOwnProperty(key)) {
                let newKey = key;
                newKey = newKey[0].toUpperCase() + newKey.substring(1);
                const self = this;
                Object.defineProperty(this.GlobalSetting, newKey, {
                    set: function (v) {
                        this[key] = v;
                        // 进行保存
                        self.saveConfigure();
                    },
                    get: function () {
                        return this[key];
                    }
                })
            }
        }
    }

    private saveConfigure() {
        window.localStorage.setItem('globalSetting', JSON.stringify(this.GlobalSetting));
    }
    setProxy(proxy: Proxy) {
        this.GlobalSetting.Proxy = proxy;
        const proxyAddress = proxy.Enabled ? ((proxy.Socks5 ? 'socks5://' : '') + `${proxy.Host}:${proxy.Port}`) : 'direct://'
        this.electronService.SetProxy(proxyAddress);
    }
    Init() {
        // 进行初始化全局设定操作
        this.setProxy(this.GlobalSetting.Proxy);
    }
}
