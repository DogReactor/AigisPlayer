import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../../core/game.service';
import { GameModel } from '../../../../../../core/game.model'
import { GlobalStatusService } from '../../../../../../global/globalStatus.service'
import { AccountList, GlobalSettingService } from '../../../../../../global/globalSetting.service'
import * as Rx from 'rxjs'

@Component({
    selector: 'app-uiframe-statusbar-toolbar-accountselect',
    templateUrl: './accountselect.component.html',
    styleUrls: ['./accountselect.component.scss']
})
export class UIFrameStatusBarToolBarAccountSelectComponent implements OnDestroy {
    accountList: AccountList;
    selectedAccount: String = '';
    subscriptionList: Rx.Subscription[] = [];
    accountListPassword = '';
    accountListPasswordError = false;
    @Output() onSelected = new EventEmitter(); // closeMenu
    constructor(private globalStatusService: GlobalStatusService, private globalSettingService: GlobalSettingService) {
        this.accountList = this.globalSettingService.AccountList;
        this.selectedAccount = globalStatusService.GlobalStatusStore.Get('SelectedAccount').Value;
        this.subscriptionList.push(
            globalStatusService.GlobalStatusStore.Get('SelectedAccount').Subscribe(v => {
                this.selectedAccount = v;
            }),
            globalStatusService.GlobalStatusStore.Get('AccountListPasswordError').Subscribe(v => {
                this.accountListPasswordError = v;
            })
        )
    }
    selectAccount(username) {
        this.onSelected.emit();
        if (this.selectedAccount === username) {
            this.globalStatusService.GlobalStatusStore.Get('SelectedAccount').Dispatch('');
        } else {
            this.globalStatusService.GlobalStatusStore.Get('SelectedAccount').Dispatch(username);
        }
    }
    enterAccountListPassword() {
        this.accountListPasswordError = false;
        this.globalStatusService.GlobalStatusStore.Get('AccountListPassword').Dispatch(this.accountListPassword);
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionList.length; i++) {
            this.subscriptionList[i].unsubscribe();
        }
    }
    iconClick(e) {
        console.log(e);
    }
    forceClearPassword() {
        this.globalSettingService.ForceClearPassword();
    }
}
