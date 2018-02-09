import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../../core/game.service';
import { GameModel } from '../../../../../../core/game.model'

@Component({
    selector: 'app-uiframe-statusbar-toolbar-gameselect',
    templateUrl: './gameselect.component.html',
    styleUrls: ['./gameselect.component.scss']
})
export class UIFrameStatusBarToolBarGameSelectComponent {
    gameList: GameModel[];
    @Output() onSelected = new EventEmitter();
    constructor(private gameService: GameService) {
        this.gameList = gameService.GameInfo;
    }
    selectGame(index) {
        this.onSelected.emit();
        this.gameService.LoadGame(index);
    }
}
