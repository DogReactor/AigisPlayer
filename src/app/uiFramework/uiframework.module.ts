import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { GameModule } from './modules/game/game.module';
import { UIFrameStatusBarModule } from './modules/statusbar/statusbar.module'
import { UIFrameComponent } from './uiframework.component';
import { UIFrameMainComponent } from './components/main/main.component'
import { UIFrameNavbarComponent } from './components/navbar/navbar.component'

@NgModule({
    declarations: [UIFrameComponent, UIFrameMainComponent, UIFrameNavbarComponent],
    imports: [GameModule, SharedModule, UIFrameStatusBarModule],
    exports: [UIFrameComponent]
})
export class UiFrameModule { }
