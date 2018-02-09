import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { UIFrameStatusBarToolBarComponent } from './toolbar.component'
import { UIFrameStatusBarToolBarGameSelectComponent } from './components/gameselect/gameselect.component'
import { UIFrameStatusBarToolBarSettingModule } from './modules/setting/setting.module'
import { UIFrameStatusBarToolBarAccountSelectComponent } from './components/accountselect/accountselect.component'

@NgModule({
    declarations: [UIFrameStatusBarToolBarComponent,
        UIFrameStatusBarToolBarGameSelectComponent,
        UIFrameStatusBarToolBarAccountSelectComponent],
    imports: [SharedModule, UIFrameStatusBarToolBarSettingModule],
    exports: [UIFrameStatusBarToolBarComponent]
})
export class UIFrameStatusBarToolBarModule { }
