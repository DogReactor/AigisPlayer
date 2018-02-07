import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { UIFrameStatusBarToolBarComponent } from './toolbar.component'
import { UIFrameStatusBarToolBarGameSelectComponent } from './component/gameselect/gameselect.component'
import { UIFrameStatusBarToolBarSettingModule } from './setting/setting.module'

@NgModule({
    declarations: [UIFrameStatusBarToolBarComponent, UIFrameStatusBarToolBarGameSelectComponent],
    imports: [SharedModule, UIFrameStatusBarToolBarSettingModule],
    exports: [UIFrameStatusBarToolBarComponent]
})
export class UIFrameStatusBarToolBarModule { }
