import { Component, Input } from '@angular/core';
import { GameService } from '../../../core/game.service';

@Component({
  selector: 'app-uiframe-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class UIFrameStatusBarComponent {
  @Input() dialogToggle: Function;

  constructor(private gameService: GameService) {}

  screenshot(event) {
    if (event.button === 0) {
      this.gameService.ScreenShot();
    } else {
      this.gameService.ScreenShot(true);
    }
  }

  toggle() {
    if (this.dialogToggle) {
      this.dialogToggle('statusbar');
    }
  }
}
