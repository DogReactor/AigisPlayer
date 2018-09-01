import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalStatusService } from '../global/globalStatus.service';
import { ElectronService } from '../core/electron.service';
import { ElMessageService } from 'element-angular';

@Component({
    selector: 'app-uiframe',
    templateUrl: './uiframework.component.html',
    styleUrls: ['./uiframework.component.scss']
})
export class UIFrameComponent implements OnInit {
    constructor(
        private globalStatusService: GlobalStatusService,
        private electronService: ElectronService,
        private message: ElMessageService) {
    }
    ngOnInit() {
        this.electronService.CheckForUpdate(() => {
            this.message['success']('新版本下载成功，请在设置菜单确认安装');
            this.globalStatusService.GlobalStatusStore.Get('NewVersionAVB').Dispatch(true);
        })
    }
}
