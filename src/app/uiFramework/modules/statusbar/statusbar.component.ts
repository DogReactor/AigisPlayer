import { Component, Input } from '@angular/core';
import { GameService } from '../../../core/game.service';
import { LogService } from '../../../core/log.service';

@Component({
  selector: 'app-uiframe-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class UIFrameStatusBarComponent {
  @Input() dialogToggle: Function;

  constructor(public gameService: GameService, public logService: LogService) {}

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

  pause() {
    this.gameService.emitEvent('aigis-pause');
  }
  slowTick() {
    this.gameService.SlowTick = !this.gameService.SlowTick;
  }

  isAigisOrShirore() {
    return this.gameService.CurrentGame.Spec === 'aigis' || this.gameService.CurrentGame.Spec === 'oshiro';
  }
}
