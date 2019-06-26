import { Component, OnInit } from '@angular/core';
import { GlobalStatusService } from '../global/globalStatus.service';
import { ElectronService } from '../core/electron.service';
import { ElMessageService } from 'element-angular';
import { GameService } from '../core/game.service';

export type ToggleCases = 'statusbar' | 'navbar';

@Component({
  selector: 'app-uiframe',
  templateUrl: './uiframework.component.html',
  styleUrls: ['./uiframework.component.scss'],
})
export class UIFrameComponent implements OnInit {
  dialogVisible = false;
  title = '';
  okText = '';
  cancelText = '';
  currentStatus: ToggleCases;

  constructor(
    private gameService: GameService,
    private globalStatusService: GlobalStatusService,
    private electronService: ElectronService,
    private message: ElMessageService,
  ) {}

  showDialog = (type: ToggleCases) => {
    switch (type) {
      // 上方导航栏，控制最小化及关闭
      case 'navbar':
        this.title = '你确定要退出咩a';
        this.okText = '退出';
        break;
      // 下方导航栏，控制刷新及截屏
      case 'statusbar':
        this.title = '你确定要刷新咩a';
        this.okText = '刷';
        break;

      default:
        break;
    }
    this.cancelText = '手滑';
    this.currentStatus = type;
    this.dialogVisible = true;
  };

  reload() {
    this.gameService.Reload();
  }

  handleOnOk = () => {
    switch (this.currentStatus) {
      case 'navbar':
        this.electronService.APP.exit(0);
        break;

      case 'statusbar':
        this.reload();
        break;

      default:
        break;
    }
    this.dialogVisible = false;
  };

  handleOnCancel = () => {
    this.dialogVisible = false;
  };

  ngOnInit() {
    this.electronService.CheckForUpdate(() => {
      this.message['success']('新版本下载成功，请在设置菜单确认安装');
      this.globalStatusService.GlobalStatusStore.Get('NewVersionAVB').Dispatch(
        true,
      );
    });
  }
}
