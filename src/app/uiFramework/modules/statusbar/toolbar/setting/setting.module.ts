import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { UIFrameStatusBarToolBarSettingComponent } from './setting.component';
import { SettingRouting } from './setting-routing.module'

@NgModule({
    declarations: [UIFrameStatusBarToolBarSettingComponent],
    imports: [SharedModule, SettingRouting],
    exports: [UIFrameStatusBarToolBarSettingComponent]
})
export class UIFrameStatusBarToolBarSettingModule {

}
