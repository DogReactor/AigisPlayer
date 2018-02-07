import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../global/globalSetting.service'

@Component({
    selector: 'app-uiframe-statusbar-toolbar-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class UIFrameStatusBarToolBarSettingComponent {
    constructor(private gameService: GameService, private globalSettingService: GlobalSettingService) {

    }
}
