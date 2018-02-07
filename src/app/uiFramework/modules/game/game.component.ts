import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../core/game.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
    private gameView = null;
    constructor(private gameService: GameService) { }
    ngAfterViewInit() {
        this.gameView = document.getElementById('gameView');
        this.gameService.WebView = this.gameView;
        let webContent = null;
        let webview = this.gameView;
        webview.addEventListener('dom-ready', () => {
            webContent = webview.getWebContents();
            // webview.openDevTools();
            if ((webview.getURL().indexOf('app_id') !== -1) || webview.getURL().indexOf('/play/') !== -1) {
                webview.send('catch');  // 通知页面进行调整
                // decipher.attach(webview.getWebContents(), this.$root.eventHub, this.numid); // 注入debuger
            }
            /*// 自动输入用户名密码
            if (webview.getURL().indexOf('login') !== -1 && webview.getURL().indexOf('logout') === -1) {
                if (this.account == null) return;
                webview.send('login', { username: this.account.username, password: this.account.password });
            }*/
        });
        // gameView注入debugger，所有数据全部发到gameServices里去
    }
}
