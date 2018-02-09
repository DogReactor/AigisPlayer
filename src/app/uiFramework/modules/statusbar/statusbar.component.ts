import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service'
import { ElMessageService } from 'element-angular'

@Component({
    selector: 'app-uiframe-statusbar',
    templateUrl: './statusbar.component.html',
    styleUrls: ['./statusbar.component.scss']
})
export class UIFrameStatusBarComponent {
    constructor(
        private gameService: GameService,
        private translateService: TranslateService,
        private message: ElMessageService) {
    }
    reload() {
        this.gameService.Reload();
    }
    screenshot() {
        this.gameService.ScreenShot();
        /*this.translateService.get('MESSAGE.SCREENSHOT-SUCCESS').subscribe(res => {
            this.message['success'](res)
        });*/
    }
}
