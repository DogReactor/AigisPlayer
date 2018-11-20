import { Injectable } from '@angular/core';
import * as Rx from 'rxjs'
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
        ExtraHeight: 0,
        ExtraWidth: 0,
        LeftPluginWidth: 0,
        RightPluginWidth: 0,
        NewVersionAVB: false,
        CurrentGame: new GameModel('None', new Size(640, 960), 'about:blank'),
        AccountList: new Array<string>()
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
        this.GlobalStatusStore.Get('Zoom').Subscribe(() => { this.setZoom() });
        this.GlobalStatusStore.Get('ExtraHeight').Subscribe(() => { this.setZoom() });
        this.GlobalStatusStore.Get('ExtraWidth').Subscribe(() => { this.setZoom() });
        this.GlobalStatusStore.Get('LeftPluginWidth').Subscribe(() => { this.setZoom() });
        this.GlobalStatusStore.Get('RightPluginWidth').Subscribe(() => { this.setZoom() });
    }
    setZoom(v?) {
        const currentGame = this.GlobalStatusStore.Get('CurrentGame').Value;
        const zoom = this.GlobalStatusStore.Get('Zoom').Value;
        const extraHeight = this.GlobalStatusStore.Get('ExtraHeight').Value;
        const extraWidth = this.GlobalStatusStore.Get('ExtraWidth').Value;
        const leftPlugin = this.GlobalStatusStore.Get('LeftPluginWidth').Value;
        const rightPlugin = this.GlobalStatusStore.Get('RightPluginWidth').Value;
        this.electronService.ReSize(new Size(
            Math.floor((currentGame.Size.Height + extraHeight) * (zoom / 100)),
            Math.floor((currentGame.Size.Width + extraWidth) * (zoom / 100) + leftPlugin + rightPlugin)
        ));
    }
}
