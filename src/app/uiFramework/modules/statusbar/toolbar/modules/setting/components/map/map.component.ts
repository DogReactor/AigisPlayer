import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../../../../../../../../core/game.service'
import { GlobalSettingService } from '../../../../../../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../../../../../../global/globalStatus.service'

@Component({
    selector: 'app-setting-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class SettingMapComponent {
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private globalStatusService: GlobalStatusService
    ) {

    }
    keyup(target, event: KeyboardEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.globalSettingService.GlobalSetting[target] = event.code;
    }
    clear(target) {
        this.globalSettingService.GlobalSetting[target] = '';
    }
}
