import { NgModule } from '@angular/core';
import { UIFrameComponent } from './uiframework.component';
import { UIFrameMainComponent } from './main/main.component'
import { SharedModule } from '../shared.module';
import { GameModule } from '../game/game.module'

@NgModule({
    declarations: [UIFrameComponent, UIFrameMainComponent],
    imports: [GameModule],
    exports: [UIFrameComponent]
})
export class UiFrameModule { }
