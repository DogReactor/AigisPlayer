import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { GlobalSettingService } from './globalSetting.service';
import { GlobalStatus } from './globalStatus.service'

@NgModule({
    providers: [GlobalSettingService, GlobalStatus]
})
export class CoreModule {

}
