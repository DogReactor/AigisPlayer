import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../../../core/game.service'
import { GlobalStatusService } from '../../../../../global/globalStatus.service'
import { PluginService, Plugin } from '../../../../../core/plugin.service'

@Component({
    selector: 'app-plugin-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class PluginContainerComponent {
    private list: Plugin[] = [];
    private menuList = [];
    constructor(
        private gameService: GameService,
        private globalStatusService: GlobalStatusService,
        private pluginService: PluginService
    ) {
        // 订阅列表更新
        this.pluginService.listUpdate.subscribe(v => {
            for (let i = 0; i < pluginService.PluginList.length; i++) {
                const plugin = pluginService.PluginList[i];
                this.menuList.push({ label: plugin.pluginName, value: plugin })
            }
        });
    }
    menuSelected(e) {
        // 检查插件embed属性是否为true，是的话push进list，不是的话直接创建新窗口
        this.list.push(e.value);
    }
}
