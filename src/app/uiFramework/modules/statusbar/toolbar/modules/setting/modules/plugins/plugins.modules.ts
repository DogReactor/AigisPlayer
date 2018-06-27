import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../../../shared.module';
import { SettingPluginsComponent } from './plugins.component'
import { PluginsPluginComponent } from './components/plugin.component'

@NgModule({
    declarations: [
        SettingPluginsComponent,
        PluginsPluginComponent
    ],
    imports: [SharedModule],
    exports: [SettingPluginsComponent]
})
export class SettingPluginsModule {

}
