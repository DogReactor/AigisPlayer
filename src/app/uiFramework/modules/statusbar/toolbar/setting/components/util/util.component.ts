import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../global/globalStatus.service'
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
        this.createForm();
        this.observeChange();
    }

    createForm() {
        this.utilForm = this.fb.group({
            Lock: this.globalStatusService.GlobalStatusStore.Lock,
            Mute: this.globalStatusService.GlobalStatusStore.Mute
        })
        // 订阅GlobalSetting
        this.setSubscribe('Lock');
        this.setSubscribe('Mute');
    }

    observeChange() {
        this.utilForm.get('Lock').valueChanges.forEach(
            (value: boolean) => this.globalStatusService.GlobalStatus.Lock.next(value)
        )
        this.utilForm.get('Mute').valueChanges.forEach(
            (value: boolean) => this.globalStatusService.GlobalStatus.Mute.next(value)
        )
    }

    private setSubscribe(key: string) {
        const subscription = this.globalStatusService.GlobalStatus[key].subscribe({
            next: v => {
                if (v !== this.utilForm.get(key).value) {
                    const patchValue = {};
                    patchValue[key] = v;
                    this.utilForm.patchValue(patchValue)
                }
            }
        })
        this.subscriptions.push(subscription);
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}
