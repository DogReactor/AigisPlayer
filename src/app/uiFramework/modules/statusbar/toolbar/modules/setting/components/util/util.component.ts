import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService, gameInfo } from '../../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'
import { Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core';
import { LanguageList } from '../../../../../../../../core/languageList'
import { ElectronService } from '../../../../../../../../core/electron.service'
import { GameModel } from '../../../../../../../../core/game.model'
import { Size } from '../../../../../../../../core/util'
import { shell } from 'electron'
import * as path from 'path'
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
@Component({
    selector: 'app-setting-util',
    templateUrl: './util.component.html',
    styleUrls: ['./util.component.scss']
})
export class SettingUtilComponent implements OnDestroy {
    utilForm: FormGroup;
    private subscriptions: Subscription[] = [];
    private languageList = LanguageList;
    disableHardwareAcceleration = false;
    DataCollectPermit = true;
    DefaultGame: GameModel;
    updateReady = false;
    appVersion: string;
    private zoom$ = new Subject<number>();
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
        this.DataCollectPermit = this.globalSettingService.GlobalSetting.DataCollectPermit;
        this.disableHardwareAcceleration = this.globalSettingService.GlobalSetting.DisableHardwareAcceleration;
        this.DefaultGame = this.globalSettingService.GlobalSetting.DefaultGame;
        this.appVersion = this.electronService.APP.getVersion();
        this.globalStatusService.GlobalStatusStore.Get('NewVersionAVB').Subscribe((v) => {
            this.updateReady = v;
        })
        // 注册zoom的防抖
        this.zoom$.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(v => {
            const state = this.globalStatusService.GlobalStatusStore.Get('Zoom');
            state.Dispatch(v);
        })
    }
    switchDisableHardwareAcceleration(value) {
        this.globalSettingService.revertDisableHardwareAcceleration();
    }
    changeLanguage(value) {
        this.globalSettingService.GlobalSetting.Language = value;
        this.translateService.use(value);
    }
    changeDefaultGame(value) {
        this.globalSettingService.GlobalSetting.DefaultGame = value;
    }
    switchPermit(value) {
        this.globalSettingService.GlobalSetting.DataCollectPermit = value;
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
