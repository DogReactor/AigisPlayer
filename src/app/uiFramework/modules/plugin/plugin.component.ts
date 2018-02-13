import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service';
import { GlobalSettingService, Account } from '../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../global/globalStatus.service'
import { ElMessageService } from 'element-angular'
import * as Rx from 'rxjs/Rx'
import { WebviewTag, WebContents } from 'electron';
import { ElectronService } from '../../../core/electron.service'
import { DecipherService } from '../../../decipher/decipher.service'
import { PluginService } from '../../../core/plugin.service'

@Component({
    selector: 'app-plugin',
    templateUrl: './plugin.component.html',
    styleUrls: ['./plugin.component.scss'],
    providers: [DecipherService]
})
export class PluginComponent implements AfterViewInit, OnDestroy {
    private menuShow = false;
    private menuPosition = {
        top: 0,
        left: 0
    }
    private subscriptionList: Rx.Subscription[] = [];
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private globalStatusService: GlobalStatusService,
        private message: ElMessageService,
        private translateService: TranslateService,
        private electronService: ElectronService,
        private decipherService: DecipherService,
        private pluginService: PluginService
    ) {
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionList.length; i++) {
            this.subscriptionList[i].unsubscribe();
        }
    }
}
