import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { UIFrameStatusBarComponent } from './statusbar.component';

@NgModule({
    declarations: [UIFrameStatusBarComponent],
    imports: [SharedModule],
    exports: [UIFrameStatusBarComponent]
})
export class UIFrameStatusBarModule {

}
