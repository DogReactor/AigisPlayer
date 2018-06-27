import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugin, PluginService } from '../../../../../../../../core/plugin.service'

@Component({
    selector: 'app-setting-plugins',
    templateUrl: './plugins.component.html',
    styleUrls: ['./plugins.component.scss'],
})
export class SettingPluginsComponent {
    plugins: Plugin[]
    constructor(private pluginService: PluginService) {
        // http
        this.getPluginList();
    }
    async getPluginList() {
        this.plugins = await this.pluginService.getPluginListFromRemote();
    }
}
