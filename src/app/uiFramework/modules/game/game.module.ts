import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { WebviewDirective } from './webview.directive';
import { SharedModule } from '../../../shared.module';

@NgModule({
    declarations: [GameComponent, WebviewDirective],
    imports: [SharedModule],
    exports: [GameComponent]
})
export class GameModule {

}
