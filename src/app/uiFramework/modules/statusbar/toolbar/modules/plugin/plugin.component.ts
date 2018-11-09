import { Component, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../../core/game.service';
import { GlobalSettingService, Account } from '../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../global/globalStatus.service'
import { ElMessageService } from 'element-angular'
import * as Rx from 'rxjs'
import { WebviewTag, WebContents } from 'electron';
import { ElectronService } from '../../../../../../core/electron.service'
import { PluginService, Plugin } from '../../../../../../core/plugin.service'

@Component({
    selector: 'app-uiframe-statusbar-toolbar-plugin',
    templateUrl: './plugin.component.html',
    styleUrls: ['./plugin.component.scss']
})
export class UIFrameStatusBarToolBarPluginComponent implements AfterViewInit, OnDestroy {
    private subscriptionList: Rx.Subscription[] = [];
    private list: Plugin[] = [];
    @Output() onSelected = new EventEmitter(); // closeMenu
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private globalStatusService: GlobalStatusService,
        private message: ElMessageService,
        private translateService: TranslateService,
        private electronService: ElectronService,
        private pluginService: PluginService
    ) {
        this.list = pluginService.PluginList;
        this.subscriptionList.push(
            pluginService.ListUpdate.subscribe(v => {
                this.list = pluginService.PluginList;
            })
        )
    }
    pluginSelect(index) {
        this.pluginService.ActivePlugin(this.list[index]);
        this.onSelected.emit();
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionList.length; i++) {
            this.subscriptionList[i].unsubscribe();
        }
    }
}
