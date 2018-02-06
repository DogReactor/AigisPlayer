import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronService } from './electron.service'
import { GameService } from './game.service'


@NgModule({
    imports: [CommonModule],
    providers: [ElectronService, GameService]
})
export class CoreModule {

}
