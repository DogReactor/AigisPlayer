import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
    private gameView = null;
    constructor(private gameService: GameService) { }
    ngAfterViewInit() {
        this.gameView = document.getElementById('gameView');
        this.gameService.WebView = this.gameView;

        // gameView调整大小
        // gameView注入debugger，所有数据全部发到gameServices里去
    }
}
