import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../global/globalSetting.service'
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-uiframe-statusbar-toolbar-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(0)
            ]),
            transition(':leave', [
                animate(0, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class UIFrameStatusBarToolBarSettingComponent {
    index: String = 'util';
    constructor(private gameService: GameService, private globalSettingService: GlobalSettingService) {

    }
}
