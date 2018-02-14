import { Injectable } from '@angular/core';
import { Size } from './util';
import { GameModel } from './game.model';
import { ElectronService } from './electron.service';
import { KeyMapperList } from './keyMapper'
import { Rectangle, NativeImage, WebviewTag } from 'electron';
import { ElMessageService } from 'element-angular';
import { TranslateService } from '@ngx-translate/core';

const gameInfo = [
    new GameModel(
        '千年戦争アイギス',
        new Size(640, 960),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRl
        pZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cAVlUFAR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    ),
    new GameModel(
        '千年戦争アイギス R',
        new Size(640, 960),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cCV1EABB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    ),
    new GameModel(
        '御城プロジェクト:RE',
        new Size(720, 1275),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1EAVlQGAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    ),
    new GameModel(
        '神姫プロジェクト',
        new Size(640, 960),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
        AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1ECUlcGBx9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'kamihime'
    ),
    new GameModel(
        '神姫プロジェクト R',
        new Size(640, 960),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
        AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1QDU1AOAh9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'kamihime'
    ),
    new GameModel(
        '神姬計劃',
        new Size(640, 960),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
        AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1AAVVIHBR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'kamihime'
    ),
    new GameModel(
        '神姬計劃 X',
        new Size(640, 960),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
        AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1AEU1AEAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'kamihime'
    ),
]


@Injectable()
export class GameService {
    private webView = null;
    public GameInfo = gameInfo;
    public CurrentGame: GameModel;
    private zoom = 100;
    constructor(
        private electronService: ElectronService,
        private translateService: TranslateService,
        private message: ElMessageService
    ) {
        this.CurrentGame = new GameModel('None', new Size(640, 960), 'about:blank');
    }
    set WebView(webView) {
        this.webView = webView;
    }

    Reload() {
        if (this.webView) {
            this.webView.reload();
        }
    }
    ReloadGame() {
        if (this.webView) {
            this.webView.loadURL(this.CurrentGame.URL);
        }
    }
    setAudioMuted(enable) {
        if (this.webView) {
            this.webView.setAudioMuted(enable)
        }
    }
    LoadGame(index) {
        if (this.webView && index < gameInfo.length) {
            const game = gameInfo[index];
            this.CurrentGame = game;
            // 通知webView跳转页面
            this.webView.loadURL(game.URL);
            // 修改Electron的窗口大小
            this.electronService.ReSize(new Size(
                Math.floor(this.CurrentGame.Size.Height * (this.zoom / 100)),
                Math.floor(this.CurrentGame.Size.Width * (this.zoom / 100))
            ));
            document.title = <string>game.Name;
        }
    }
    KeyMapperTrigger(keyName) {
        const keyMapper = KeyMapperList.find(v => v.Name === keyName);
        if (!keyMapper) { return; }
        const x = Math.floor(keyMapper.X + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Width);
        const y = Math.floor(keyMapper.Y + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Height);
        if (this.webView) {
            const webContents = this.webView.getWebContents();
            if (webContents) {
                webContents.sendInputEvent({
                    type: 'mouseMove',
                    x: x,
                    y: y,
                    button: 'left',
                });
                setTimeout(() => {
                    webContents.sendInputEvent({
                        type: 'mouseDown',
                        x: x,
                        y: y,
                        button: 'left',
                        clickCount: 1
                    });
                    setTimeout(() => {
                        webContents.sendInputEvent({
                            type: 'mouseUp',
                            x: x,
                            y: y,
                            button: 'left',
                            clickCount: 1
                        });
                    }, 20);
                }, 20);
            }
        }
    }
    ScreenShot(callback?: Function) {
        if (this.webView) {
            const code = `var r = {}; \
                r.pageHeight = window.innerHeight; \
                r.pageWidth = window.innerWidth; \
                r;`;
            this.webView.executeJavaScript(code, false, (r) => {
                const webviewMeta = {
                    captureHeight: 0,
                    captureWidth: 0
                };
                webviewMeta.captureHeight = r.pageHeight;
                webviewMeta.captureWidth = r.pageWidth;
                const captureRect = {
                    x: 0,
                    y: 0,
                    width: +webviewMeta.captureWidth * this.electronService.electron.screen.getPrimaryDisplay().scaleFactor,
                    height: +webviewMeta.captureHeight * this.electronService.electron.screen.getPrimaryDisplay().scaleFactor
                };
                this.webView.capturePage(captureRect, (image: NativeImage) => {
                    this.electronService.clipboard.writeImage(image);
                });
                this.translateService.get('MESSAGE.SCREENSHOT-SUCCESS').subscribe(res => {
                    this.message['success'](res)
                });
            });
        }
    }
    SetZoom(zoom) {
        // 通知electronService修改窗口大小
        this.zoom = zoom;
        this.electronService.ReSize(new Size(
            Math.floor(this.CurrentGame.Size.Height * (zoom / 100)),
            Math.floor(this.CurrentGame.Size.Width * (zoom / 100))
        ));
    }
}
