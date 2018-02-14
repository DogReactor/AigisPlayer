import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service'
import { GlobalStatusService } from '../../../global/globalStatus.service'

@Component({
    selector: 'app-uiframe-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class UIFrameMainComponent {
    private zoom = 100;
    constructor(private gameService: GameService, private globalStatusService: GlobalStatusService) {
        const state = this.globalStatusService.GlobalStatusStore.Get('Zoom');
        this.zoom = state.Value;
        state.Subscribe(v => { this.zoom = v });
    }
}
