import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../core/game.service';
import { GlobalStatusService } from '../../../../global/globalStatus.service'
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-uiframe-statusbar-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(100)
            ]),
            transition(':leave', [
                animate(100, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class UIFrameStatusBarToolBarComponent {
    selectedMenu: String;
    constructor(
        private globalStatusService: GlobalStatusService,
        private renderer: Renderer2
    ) {
    }
    selectMenu(menu) {
        if (menu === this.selectedMenu) {
            this.closeMenu();
        } else {
            this.selectedMenu = menu;
        }
    }
    closeMenu() {
        this.selectedMenu = 'none';
    }
}
