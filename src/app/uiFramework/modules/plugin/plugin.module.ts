import { NgModule } from '@angular/core';
import { PluginComponent } from './plugin.component';
import { WebviewDirective } from './webview.directive';
import { SharedModule } from '../../../shared.module';
import { PluginContainerComponent } from './components/plugin-container/container.component'

@NgModule({
    declarations: [PluginComponent, WebviewDirective, PluginContainerComponent],
    imports: [SharedModule],
    exports: [PluginComponent]
})
export class PluginModule {

}
