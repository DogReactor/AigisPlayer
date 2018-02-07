import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service'

@Component({
    selector: 'app-uiframe-statusbar',
    templateUrl: './statusbar.component.html',
    styleUrls: ['./statusbar.component.scss']
})
export class UIFrameStatusBarComponent {
    constructor(private gameService: GameService) {

    }
    reload() {
        this.gameService.Reload();
    }
}
