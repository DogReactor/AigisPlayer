import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../../../shared.module';
import { UIFrameStatusBarToolBarSettingComponent } from './setting.component';
import { SettingProxyComponent } from './components/proxy/proxy.component';
import { SettingUtilComponent } from './components/util/util.component';

@NgModule({
    declarations: [UIFrameStatusBarToolBarSettingComponent, SettingProxyComponent, SettingUtilComponent],
    imports: [SharedModule, ReactiveFormsModule],
    exports: [UIFrameStatusBarToolBarSettingComponent]
})
export class UIFrameStatusBarToolBarSettingModule {

}
