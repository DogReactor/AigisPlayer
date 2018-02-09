import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
    selector: 'app-setting-util',
    templateUrl: './util.component.html',
    styleUrls: ['./util.component.scss']
})
export class SettingUtilComponent implements OnDestroy {
    utilForm: FormGroup;
    private subscriptions: Subscription[] = [];
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private fb: FormBuilder,
        private globalStatusService: GlobalStatusService
    ) {
        // 在这里注册按钮
        this.regProp('Mute');
        this.regProp('Lock');
    }

    selectSwitch(key) {
        const state = this.globalStatusService.GlobalStatusStore.Get(key);
        state.Dispatch(!this[key]);
    }

    ngOnDestroy() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].unsubscribe();
        }
    }

    regProp(key, selfKey?) {
        const state = this.globalStatusService.GlobalStatusStore.Get(key);
        let k = key;
        if (selfKey) { k = selfKey }
        this[k] = state.Value;
        this.subscriptions.push(
            state.Subscribe(v => this[k] = v)
        )
    }
}
