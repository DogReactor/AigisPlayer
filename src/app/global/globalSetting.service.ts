import { Injectable } from '@angular/core';
import { ElectronService } from '../core/electron.service'
import { AddSetterToObject } from '../core/util'
import * as crypto from 'crypto'
import { GlobalStatusService } from './globalStatus.service'
import { ElMessageService } from 'element-angular';
import { TranslateService } from '@ngx-translate/core';
import { GameModel } from '../core/game.model';
import { Size } from '../core/util';
import * as Config from 'electron-config'
const config = new Config();

export const ProxyRule = {
    off: 'direct://',
    shimakazego: '127.0.0.1:8099',
    acgp: '127.0.0.1:8123',
    shadowsocks: 'socks5://127.0.0.1:1080',
    custom: '',
}

export class Proxy {
    Type = 'off';
    Host = '';
    Port = '';
    Socks5 = false;
    Enabled = false;
}
export class Account {
    Name = '新账户';
    Username = '';
    Password = '';
    IsDefault = false;
}
export class AccountList {
    Encrypted = false;
    EncryptedList = '';
    List: Account[] = [];
}

export class GlobalSetting {
    public Proxy = new Proxy();
    public SpeedUpKey = '';
    public UseSkillKey = '';
    public ScreenShotKey = '';
    public ReloadKey = '';
    public Language = 'cn';
    public Zoom = 100;
    public Opacity = 100;
    public Mute = false;
    public Lock = false;
    public DefaultGame = new GameModel('None', new Size(640, 960), 'about:blank');
    public DataCollectPermit = true;
    public DisableHardwareAcceleration = false;
}

const needDispatch = ['Zoom', 'Mute', 'Lock', 'Opacity'];

@Injectable()
export class GlobalSettingService {
    public GlobalSetting = new GlobalSetting();
    public AccountList = new AccountList();
    constructor(
        private electronService: ElectronService,
        private globalStatusService: GlobalStatusService,
        private translateService: TranslateService,
        private message: ElMessageService) {
        if (window.localStorage.getItem('globalSetting')) {
            try {
                // 读取全局设置信息
                this.GlobalSetting = Object.assign(this.GlobalSetting, JSON.parse(window.localStorage.getItem('globalSetting')));

                // 装载一些数据给Service
                for (let i = 0; i < needDispatch.length; i++) {
                    const key = needDispatch[i];
                    this.globalStatusService.GlobalStatusStore.Get(key).Dispatch(this.GlobalSetting[key]);
                }
                this.globalStatusService.GlobalStatusStore.Get('CurrentGame').Dispatch(this.GlobalSetting.DefaultGame);
            } catch { }
        }
        this.GlobalSetting.DisableHardwareAcceleration = config.get('disable-hardware-acceleration') || false;
        if (window.localStorage.getItem('accountList')) {
            try {
                // 读取账户列表
                this.AccountList = Object.assign(this.AccountList, JSON.parse(window.localStorage.getItem('accountList')));
                // TODO:这里记得要加上默认账户的选择
                if (!this.AccountList.Encrypted) {
                    this.globalStatusService.GlobalStatusStore.Get('AccountList').Dispatch(
                        this.AccountList.List.map((v) => {
                            return v.Username;
                        })
                    )
                    const defaultAccount = this.AccountList.List.find(v => v.IsDefault);
                    if (defaultAccount) {
                        this.globalStatusService.GlobalStatusStore.Get('SelectedAccount').Dispatch(defaultAccount.Username);
                    }
                }
            } catch { }
        }

        // 订阅账户设置密码的变化
        this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Subscribe(v => {
            if (this.AccountList.Encrypted) {
                this.DecryptAccountList();
            } else {
                this.translateService.get('MESSAGE.SET-SUCCESS').subscribe(res => {
                    this.message['success'](res)
                });
                this.SaveAccountList();
            }
        })

        // 订阅
        for (let i = 0; i < needDispatch.length; i++) {
            const key = needDispatch[i];
            this.globalStatusService.GlobalStatusStore.Get(key).Subscribe(v => {
                this.GlobalSetting[key] = v;
            })
        }

        // 给globalSetting的所有成员加上getter和setter，方便调取saveConfigure
        AddSetterToObject(this.GlobalSetting, (v) => {
            this.saveConfigure();
        })
    }

    public revertDisableHardwareAcceleration() {
        this.GlobalSetting.DisableHardwareAcceleration = !this.GlobalSetting.DisableHardwareAcceleration;
        config.set('disable-hardware-acceleration', this.GlobalSetting.DisableHardwareAcceleration);
    }
    private saveConfigure() {
        window.localStorage.setItem('globalSetting', JSON.stringify(this.GlobalSetting));
    }

    public SaveAccountList() {
        // 这里实际上要加密
        window.localStorage.setItem('accountList', JSON.stringify(this.AccountList));
        const password = this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Value;
        if (password && password !== '') {
            const tempAccountList = new AccountList();
            tempAccountList.Encrypted = true;
            const cipher = crypto.createCipher('aes192', password);
            let encrypted = '';
            cipher.on('readable', () => {
                const data = cipher.read();
                if (data) {
                    encrypted += (<Buffer>data).toString('hex');
                }

            });
            cipher.on('end', () => {
                tempAccountList.EncryptedList = encrypted;
                window.localStorage.setItem('accountList', JSON.stringify(tempAccountList));
            });
            cipher.write(JSON.stringify(this.AccountList.List));
            cipher.end();
        } else {
            const tempAccountList = new AccountList();
            tempAccountList.Encrypted = false;
            tempAccountList.List = this.AccountList.List;
            window.localStorage.setItem('accountList', JSON.stringify(tempAccountList));
        }
    }

    Init() {
        // 进行初始化全局设定操作
        this.setProxy(this.GlobalSetting.Proxy);
        this.globalStatusService.GlobalStatusStore.Get('Zoom').Dispatch(this.GlobalSetting.Zoom);
        this.translateService.use(this.GlobalSetting.Language);

    }
    setProxy(proxy: Proxy) {
        if (proxy.Type === undefined) {
            proxy.Type = proxy.Enabled ? 'custom' : 'off';
        }
        this.GlobalSetting.Proxy = proxy;
        // 读取规则
        let proxyRule = ProxyRule[proxy.Type];
        if (proxyRule === '') {
            proxyRule =
                (proxy.Socks5 ? 'socks5://' : '') + `${proxy.Host}:${proxy.Port}`;
        }
        if (proxyRule === undefined) {
            proxyRule = 'direct://';
        }
        this.electronService.SetProxy(proxyRule);
        this.electronService.ipcRenderer.send('proxyStatusUpdate', proxy)
    }
    FindAccount(username) {
        return this.AccountList.List.find(v => v.Username === username)
    }
    DecryptAccountList() {
        if (this.AccountList.Encrypted) {
            const password = this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Value;
            if (password !== '' && password) {
                const decipher = crypto.createDecipher('aes192', password);
                let decrypted = '';
                decipher.on('readable', () => {
                    const data = decipher.read();
                    if (data) {
                        decrypted += (<Buffer>data).toString('utf-8');
                    }
                });
                decipher.on('end', () => {
                    try {
                        this.AccountList.List = JSON.parse(decrypted);
                        this.globalStatusService.GlobalStatusStore.Get('AccountList').Dispatch(
                            this.AccountList.List.map((v) => {
                                return v.Username;
                            })
                        );
                        this.AccountList.Encrypted = false;
                        // 密码正确
                        this.globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Dispatch(false);
                        this.translateService.get('MESSAGE.DECRYPT-SUCCESS').subscribe(res => {
                            this.message['success'](res)
                        });
                    } catch { }
                });
                decipher.on('error', () => {
                    this.translateService.get('UTIL.PASSWORDERROR').subscribe(res => {
                        this.message['error'](res)
                    });
                    this.globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Dispatch(true);
                })
                decipher.write(this.AccountList.EncryptedList, 'hex');
                decipher.end();
            }
        }
    }
    ForceClearPassword() {
        this.AccountList.Encrypted = false;
        this.AccountList.EncryptedList = '';
        this.SaveAccountList();
    }
}
