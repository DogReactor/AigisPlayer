import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service';
import { GlobalSettingService, Account } from '../../../global/globalSetting.service'
import { GlobalStatusService } from '../../../global/globalStatus.service'
import { ElMessageService } from 'element-angular'
import * as Rx from 'rxjs'
import { WebviewTag, WebContents } from 'electron';
import { ElectronService } from '../../../core/electron.service'
import { PluginService } from '../../../core/plugin.service'
import { GameModel } from '../../../core/game.model';
import { DebuggerService } from '../../../gameData/debugger.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit, OnDestroy {
    private gameView: WebviewTag = null;
    private zoom = 100;
    private subscriptionList: Rx.Subscription[] = [];
    constructor(
        private gameService: GameService,
        private globalSettingService: GlobalSettingService,
        private globalStatusService: GlobalStatusService,
        private message: ElMessageService,
        private translateService: TranslateService,
        private electronService: ElectronService,
        private debuggerService: DebuggerService,
        private pluginService: PluginService
    ) {
        this.subscriptionList.push(
            this.globalStatusService.GlobalStatusStore.Get('Zoom').Subscribe(v => {
                this.zoom = v;
                if (this.gameView) {
                    if (this.gameView.setZoomFactor === undefined) { return; }
                    this.gameView.setZoomFactor(this.zoom / 100);
                }
            })
        );
    }
    ngAfterViewInit() {
        this.gameView = <WebviewTag>document.getElementById('gameView');
        this.gameService.WebView = this.gameView;
        let webContent: WebContents = null;
        const webview = this.gameView;

        webview.addEventListener('dom-ready', () => {
            // this.debuggerService.Detach(webview.getWebContents());
            webContent = webview.getWebContents();
            const mute = this.globalStatusService.GlobalStatusStore.Get('Mute').Value;
            webview.setAudioMuted(mute);
            const CurrentGame = <GameModel>this.globalStatusService.GlobalStatusStore.Get('CurrentGame').Value;
            // 第一次打开时启动默认游戏
            if (!this.gameView.canGoBack()) {
                this.gameService.LoadGame(CurrentGame);
            }
            this.gameView.setZoomFactor(this.zoom / 100);

            if (this.electronService.serve) {
                // 打开开发者工具
                // webview.openDevTools();
            }
            // 碧蓝删去滑动条
            if (CurrentGame.Spec === 'granblue') {
                webview.send('catch', CurrentGame.Spec);
                webview.insertCSS('::-webkit-scrollbar{display:none!important}');
            }

            // 通知页面进行调整
            if ((webview.getURL().indexOf('app_id') !== -1) ||
                webview.getURL().indexOf('/play/') !== -1 ||
                webview.getURL().indexOf('game_dmm.php') !== -1) {

                webview.send('catch', CurrentGame.Spec);
                this.debuggerService.Attach(webview.getWebContents()); // 注入debuger
            }

            // 自动输入用户名密码
            if (
                webview.getURL().indexOf('dmm') !== -1 &&
                webview.getURL().indexOf('login') !== -1 &&
                webview.getURL().indexOf('logout') === -1
            ) {
                // 从globalSetting中获取账号密码
                const username = this.globalStatusService.GlobalStatusStore.Get('SelectedAccount').Value;
                const account = this.globalSettingService.FindAccount(username);
                if (account) {
                    webview.send('login', { username: account.Username, password: account.Password });
                }
            }
        });
        webview.addEventListener('did-finish-load', () => {
            this.gameView.setZoomFactor(this.zoom / 100);
        })
        webview.addEventListener('did-fail-load', (event) => {
            if (event.errorDescription === '' || event.errorDescription === '' || event.isMainFrame === false) { return; }
            this.translateService.get('MESSAGE.PAGE-DIDNOT-LOAD').subscribe(res => this.message['warning'](res));
        })
        webview.addEventListener('new-window', (e) => {
            const option = e.options;
            option['height'] = 640;
            option['width'] = 1100;
            option['autoHideMenuBar'] = true;
            option['webPreferences']['session'] = webContent.session;
            this.electronService.CreateBrowserWindow(e.url, option);
        })
    }
    ngOnDestroy() {
        for (let i = 0; i < this.subscriptionList.length; i++) {
            this.subscriptionList[i].unsubscribe();
        }
    }
}
