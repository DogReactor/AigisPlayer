import { NgModule } from '@angular/core';
import { UIFrameStatusBarToolBarPluginComponent } from './plugin.component';
import { WebviewDirective } from './webview.directive';
import { SharedModule } from '../../../../../../shared.module';

@NgModule({
    declarations: [UIFrameStatusBarToolBarPluginComponent, WebviewDirective],
    imports: [SharedModule],
    exports: [UIFrameStatusBarToolBarPluginComponent]
})
export class UIFrameStatusBarToolBarPluginModule {

}
