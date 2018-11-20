import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService, AccountList, Account } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'
import { TranslateService } from '@ngx-translate/core';
import { ElMessageService } from 'element-angular'
import * as Rx from 'rxjs'

@Component({
    selector: 'app-setting-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class SettingAccountComponent implements OnDestroy {
    private accountList: AccountList;
    private selectedAccount: Account = null;
    private accountListPassword = '';
    private accountListPasswordError = false;
    private subscriptionList: Rx.Subscription[] = [];
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private globalStatusService: GlobalStatusService,
        private translateService: TranslateService,
        private message: ElMessageService
    ) {
        this.accountList = globalSettingService.AccountList;
        this.accountListPassword = this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Value;
        this.subscriptionList.push(
            globalStatusService.GlobalStatusStore.Get('AccountListPassword').Subscribe(v => this.accountListPassword = v),
            globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Subscribe(v => { this.accountListPasswordError = v; })
        )
    }
    newAccount() {
        const max = this.accountList.List.push(new Account);
        this.selectedAccount = this.accountList.List[max - 1];
    }
    deleteAccount() {
        const i = this.accountList.List.indexOf(this.selectedAccount);
        this.accountList.List.splice(i, 1);
        this.selectedAccount = null;
        this.globalSettingService.SaveAccountList();
    }
    saveAccount() {
        this.globalSettingService.SaveAccountList();
        this.translateService.get('MESSAGE.SAVE-SUCCESS').subscribe(res => {
            this.message['success'](res)
        });
    }
    setDefault() {
        for (let i = 0; i < this.accountList.List.length; i++) {
            if (this.accountList.List[i] === this.selectedAccount) {
                continue;
            }
            this.accountList.List[i].IsDefault = false;
        }
    }
    setPassword() {
        this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Dispatch(this.accountListPassword);
    }
    forceClearPassword() {
        this.globalSettingService.ForceClearPassword();
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionList.length; i++) {
            this.subscriptionList[i].unsubscribe();
        }
    }
}
