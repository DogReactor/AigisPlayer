import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { UIFrameStatusBarComponent } from './statusbar.component';
import { UIFrameStatusBarToolBarModule } from './toolbar/toolbar.module'

@NgModule({
    declarations: [UIFrameStatusBarComponent],
    imports: [SharedModule, UIFrameStatusBarToolBarModule],
    exports: [UIFrameStatusBarComponent]
})
export class UIFrameStatusBarModule {

}
