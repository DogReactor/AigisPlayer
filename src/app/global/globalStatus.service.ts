import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx'
import { ElectronService } from '../core/electron.service'
import { GameService } from '../core/game.service'
import { GameModel } from '../core/game.model'
import { Store } from '../core/store'
import { Size } from '../core/util';



@Injectable()
export class GlobalStatusService {
    public GlobalStatusStore = new Store({
        Mute: false,
        Lock: false,
        SelectedAccount: '',
        AccountListPassword: '',
        AccountListPasswordError: false,
        Zoom: 100,
        Opacity: 100,
        NewVersionAVB: false,
        CurrentGame: new GameModel('None', new Size(640, 960), 'about:blank')
    })
    constructor(
        private electronService: ElectronService,
        private gameService: GameService
    ) {
        this.GlobalStatusStore.Get('SelectedAccount').Subscribe((v) => {
            this.gameService.ReloadGame()
        })
        this.GlobalStatusStore.Get('Mute').Subscribe((v) => {
            gameService.setAudioMuted(v);
        })
        this.GlobalStatusStore.Get('Lock').Subscribe((v) => {
            electronService.currentWindow.setAlwaysOnTop(v);
        })
        this.GlobalStatusStore.Get('Zoom').Subscribe((v) => {
            gameService.SetZoom(v);
        })
        this.GlobalStatusStore.Get('CurrentGame').Subscribe((v) => {
            gameService.LoadGame(v);
        })
    }
}
