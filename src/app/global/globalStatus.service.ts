import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx'
import { ElectronService } from '../core/electron.service'
import { GameService } from '../core/game.service'

export class GlobalStatusStore {
    Mute = false;
    Lock = false;
}

export class GlobalStatus {
    Mute = new Rx.Subject<boolean>();
    Lock = new Rx.Subject<boolean>();
}

@Injectable()
export class GlobalStatusService {
    public GlobalStatus = new GlobalStatus();
    public GlobalStatusStore = new GlobalStatusStore();
    constructor(
        private electronService: ElectronService,
        private gameService: GameService
    ) {
        this.GlobalStatus.Mute.subscribe({
            next: v => {
                this.GlobalStatusStore.Mute = v;
                gameService.setAudioMuted(v);
            }
        });
        this.GlobalStatus.Lock.subscribe({
            next: v => {
                this.GlobalStatusStore.Lock = v;
                electronService.currentWindow.setAlwaysOnTop(v)
            }
        });
    }
}
