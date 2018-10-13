import { Component, AfterViewInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service'
import { GlobalStatusService } from '../../../global/globalStatus.service'
import { PluginService } from '../../../core/plugin.service';
import { AigisStatisticsService } from '../../../gameData/aigis/statistics.service';
import { WebviewTag } from 'electron';

@Component({
    selector: 'app-uiframe-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class UIFrameMainComponent implements AfterViewInit {
    private zoom = 100;
    private leftWidth = 0;
    private rightWidth = 0;
    DataCollectNote = false;
    constructor(
        private gameService: GameService,
        private globalStatusService: GlobalStatusService,
        private pluginService: PluginService,
        private changeDetectorRef: ChangeDetectorRef,
        private aigisStatisticsService: AigisStatisticsService
    ) {
        const state = this.globalStatusService.GlobalStatusStore.Get('Zoom');
        this.zoom = state.Value;
        state.Subscribe(v => { this.zoom = v });
        this.DataCollectNote = !this.aigisStatisticsService.DataCollectNoted;
    }
    ngAfterViewInit() {
        const left = <WebviewTag>document.getElementById('leftView');
        const right = <WebviewTag>document.getElementById('rightView');
        this.globalStatusService.GlobalStatusStore.Get('LeftPluginWidth').Subscribe((v) => {
            this.leftWidth = v | 0;
            this.changeDetectorRef.detectChanges();
        })
        this.globalStatusService.GlobalStatusStore.Get('RightPluginWidth').Subscribe((v) => {
            this.rightWidth = v | 0;
            this.changeDetectorRef.detectChanges();
        })
        this.pluginService.regEmbedWebview('left', left);
        this.pluginService.regEmbedWebview('right', right);
    }
    confirmDataPermit() {
        this.DataCollectNote = false;
        this.aigisStatisticsService.confirmDataPermit();
    }
}
