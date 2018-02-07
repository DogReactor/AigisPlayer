import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../global/globalSetting.service'
import { Proxy } from '../../../../../../../global/globalSetting.service'

@Component({
    selector: 'app-setting-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.scss']
})
export class SettingProxyComponent {
    proxyForm: FormGroup;
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private fb: FormBuilder
    ) {
        this.createForm(globalSettingService.GlobalSetting.proxy);
        this.observeChange();
    }

    createForm(proxy: Proxy) {
        this.proxyForm = this.fb.group(proxy)
    }

    observeChange() {
        this.proxyForm.valueChanges.forEach(
            (value) => this.globalSettingService.setProxy(value)
        );
    }
}
