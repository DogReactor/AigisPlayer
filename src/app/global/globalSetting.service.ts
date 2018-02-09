import { Injectable } from '@angular/core';
import { ElectronService } from '../core/electron.service'
import { AddSetterToObject } from '../core/util'
import * as crypto from 'crypto'
import { GlobalStatusService } from './globalStatus.service'

export class Proxy {
    Host: String = '';
    Port: String = '';
    Socks5: Boolean = false;
    Enabled: Boolean = false;
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
}

@Injectable()
export class GlobalSettingService {
    public GlobalSetting = new GlobalSetting();
    public AccountList = new AccountList();
    constructor(private electronService: ElectronService, private globalStatusService: GlobalStatusService) {
        if (window.localStorage.getItem('globalSetting')) {
            try {
                // 读取全局设置信息
                this.GlobalSetting = Object.assign(this.GlobalSetting, JSON.parse(window.localStorage.getItem('globalSetting')));
            } catch { }
        }
        if (window.localStorage.getItem('accountList')) {
            try {
                // 读取账户列表
                this.AccountList = Object.assign(this.AccountList, JSON.parse(window.localStorage.getItem('accountList')));
                // TODO:这里记得要加上默认账户的选择
                if (!this.AccountList.Encrypted) {
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
                this.SaveAccountList();
            }
        })
        // 给globalSetting的所有成员加上getter和setter，方便调取saveConfigure
        AddSetterToObject(this.GlobalSetting, (v) => {
            this.saveConfigure();
        })
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
    }
    setProxy(proxy: Proxy) {
        this.GlobalSetting.Proxy = proxy;
        const proxyAddress = proxy.Enabled ? ((proxy.Socks5 ? 'socks5://' : '') + `${proxy.Host}:${proxy.Port}`) : 'direct://'
        this.electronService.SetProxy(proxyAddress);
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
                        this.AccountList.Encrypted = false;
                        // 密码正确
                        this.globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Dispatch(false);
                    } catch {
                        this.globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Dispatch(true);
                    }
                });
                decipher.on('error', () => {
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
