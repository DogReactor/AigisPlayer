import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronService } from './electron.service'
import { GameService } from './game.service'
import { PluginService } from './plugin.service'


@NgModule({
    imports: [CommonModule],
    providers: [ElectronService, GameService, PluginService]
})
export class CoreModule {

}
