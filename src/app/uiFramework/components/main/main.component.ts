import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service'

@Component({
    selector: 'app-uiframe-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class UIFrameMainComponent {
    constructor(private gameService: GameService) {

    }
    reload() {
        this.gameService.reload();
    }
}
