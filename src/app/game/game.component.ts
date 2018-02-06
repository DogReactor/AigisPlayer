import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../core/game.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
    private gameView = null;
    ngAfterViewInit() {
        this.gameView = document.getElementById('gameView');
        console.log(this.gameView);
    }
}
