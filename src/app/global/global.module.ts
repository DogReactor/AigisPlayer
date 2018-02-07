import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { GlobalSettingService } from './globalSetting.service';
import { GlobalStatusService } from './globalStatus.service'

@NgModule({
    providers: [GlobalSettingService, GlobalStatusService]
})
export class GlobalModule {

}
