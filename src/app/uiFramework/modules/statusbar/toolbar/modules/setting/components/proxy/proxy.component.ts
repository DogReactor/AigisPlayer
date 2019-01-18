import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService, ProxyRule } from '../../../../../../../../global/globalSetting.service'
import { Proxy } from '../../../../../../../../global/globalSetting.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-setting-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.scss']
})
export class SettingProxyComponent {
    proxyForm: FormGroup;
    rules: string[];
    translations: {};
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private fb: FormBuilder,
        private translateService: TranslateService
    ) {
        this.createForm(globalSettingService.GlobalSetting.Proxy);
        this.observeChange();
        this.rules = Object.keys(ProxyRule);
        translateService.get(
            this.rules.map(v => 'SETTING.PROXY.TYPES.' + v.toUpperCase())
        ).subscribe((v) => {
            this.translations = v;
        })
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
