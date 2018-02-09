import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx'
import { ElectronService } from '../core/electron.service'
import { GameService } from '../core/game.service'
import { Store } from '../core/store'


@Injectable()
export class GlobalStatusService {
    public GlobalStatusStore = new Store({
        Mute: false,
        Lock: false,
        SelectedAccount: '',
        AccountListPassword: '',
        AccountListPasswordError: false,
    })
    constructor(
        private electronService: ElectronService,
        private gameService: GameService
    ) {
        this.GlobalStatusStore.Get('Mute').Subscribe((v) => {
            gameService.setAudioMuted(v);
        })
        this.GlobalStatusStore.Get('Lock').Subscribe((v) => {
            electronService.currentWindow.setAlwaysOnTop(v);
        })
        this.GlobalStatusStore.Get('SelectedAccount').Subscribe((v) => {
            this.gameService.ReloadGame()
        })
    }
}
