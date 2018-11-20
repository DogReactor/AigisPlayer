import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../../core/game.service';
import { GameModel } from '../../../../../../core/game.model'
import { GlobalStatusService } from '../../../../../../global/globalStatus.service';

@Component({
    selector: 'app-uiframe-statusbar-toolbar-gameselect',
    templateUrl: './gameselect.component.html',
    styleUrls: ['./gameselect.component.scss']
})
export class UIFrameStatusBarToolBarGameSelectComponent {
    gameList: GameModel[];
    @Output() onSelected = new EventEmitter();
    constructor(
        private gameService: GameService,
        private globalStatusService: GlobalStatusService
    ) {
        this.gameList = gameService.GameInfo.filter(g => g.Name !== 'None');
    }
    selectGame(index) {
        this.onSelected.emit();
        const game = this.gameList[index];
        this.globalStatusService.GlobalStatusStore.Get('CurrentGame').Dispatch(game);
    }
}
