import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../core/game.service';
import { GlobalStatusService } from '../../../../global/globalStatus.service'

@Component({
    selector: 'app-uiframe-statusbar-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class UIFrameStatusBarToolBarComponent {
    selectedMenu: String;
    constructor(private globalStatusService: GlobalStatusService) {
    }
    selectMenu(menu) {
        if (menu === this.selectedMenu) {
            this.selectedMenu = 'none';
        } else {
            this.selectedMenu = menu;
        }
    }
    closeMenu() {
        this.selectedMenu = 'none';
    }
}
