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
        private electronService: ElectronService
    ) {
        this.GlobalStatusStore.Get('Opacity').Subscribe((v) => {
            document.body.style.opacity = `${v / 100}`;
        })
        this.GlobalStatusStore.Get('Lock').Subscribe((v) => {
            electronService.currentWindow.setAlwaysOnTop(v);
        })
    }
}
