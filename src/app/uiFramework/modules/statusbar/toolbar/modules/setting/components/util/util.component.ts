import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'
import { Subscription } from 'rxjs/Subscription'
import { TranslateService } from '@ngx-translate/core';
import { LanguageList } from '../../../../../../../../core/languageList'
import { ElectronService } from '../../../../../../../../core/electron.service'
import { GameModel } from '../../../../../../../../core/game.model'
import { Size } from '../../../../../../../../core/util'
import { shell } from 'electron'
import * as path from 'path'

@Component({
    selector: 'app-setting-util',
    templateUrl: './util.component.html',
    styleUrls: ['./util.component.scss']
})
export class SettingUtilComponent implements OnDestroy {
    utilForm: FormGroup;
    private subscriptions: Subscription[] = [];
    private languageList = LanguageList;
    updateReady = false;
    appVersion: string;
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
        this.regProp('Opacity');
        this.appVersion = this.electronService.APP.getVersion();
        this.globalStatusService.GlobalStatusStore.Get('NewVersionAVB').Subscribe((v) => {
            this.updateReady = v;
        })
    }
    changeLanguage(value) {
        this.globalSettingService.GlobalSetting.Language = value;
        this.translateService.use(value);
    }
    changeDefaultGame(value) {
        if (value === 'None') {
            this.globalSettingService.GlobalSetting.CurrentGame = new GameModel('None', new Size(640, 960), 'about:blank');
        } else {
            this.globalSettingService.GlobalSetting.CurrentGame = this.gameService.GameInfo.find((game) => { return game.Name === value });
        }
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
    openScreenShotDir() {
        shell.openItem(path.join(this.electronService.APP.getPath('userData'), 'screenshots'));
    }
    updateAP() {
        this.electronService.UpdateNow();
    }
}
