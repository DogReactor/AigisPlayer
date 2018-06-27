import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'
import { Subscription } from 'rxjs/Subscription'
import { TranslateService } from '@ngx-translate/core';
import { LanguageList } from '../../../../../../../../core/languageList'
import { ElectronService } from '../../../../../../../../core/electron.service'

@Component({
    selector: 'app-setting-util',
    templateUrl: './util.component.html',
    styleUrls: ['./util.component.scss']
})
export class SettingUtilComponent implements OnDestroy {
    utilForm: FormGroup;
    private subscriptions: Subscription[] = [];
    private languageList = LanguageList;
    private updateReady = false;
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private fb: FormBuilder,
        private globalStatusService: GlobalStatusService,
        private translateService: TranslateService,
        private electronService: ElectronService
    ) {
        // 在这里注册切换按钮
        this.regProp('Mute');
        this.regProp('Lock');
        this.regProp('Zoom');
        this.globalStatusService.GlobalStatusStore.Get('NewVersionAVB').Subscribe((v) => {
            this.updateReady = v;
        })
    }
    changeLanguage(value) {
        this.globalSettingService.GlobalSetting.Language = value;
        this.translateService.use(value);
    }
    selectSwitch(key) {
        const state = this.globalStatusService.GlobalStatusStore.Get(key);
        state.Dispatch(!this[key]);
    }
    changeSlider(key, event) {
        const state = this.globalStatusService.GlobalStatusStore.Get(key);
        state.Dispatch(event);
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
    clearCache() {
        this.electronService.ClearCache();
    }
    regProp(key, alias?) {
        const state = this.globalStatusService.GlobalStatusStore.Get(key);
        let k = key;
        if (alias) { k = alias }
        this[k] = state.Value;
        this.subscriptions.push(
            state.Subscribe(v => this[k] = v)
        )
    }
    startUpdate() {
        this.electronService.UpdateNow();
    }
}
