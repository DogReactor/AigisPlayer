import { Injectable } from '@angular/core';
import { Size } from './util';
import { GameModel } from './game.model';
import { ElectronService } from './electron.service';
import { KeyMapperList } from './keyMapper'
import { Rectangle, NativeImage, WebviewTag } from 'electron';
import { ElMessageService } from 'element-angular';
import { TranslateService } from '@ngx-translate/core';
import { PluginService } from './plugin.service';
import { GlobalStatusService } from '../global/globalStatus.service';
import { GlobalSettingService } from '../global/globalSetting.service';
import * as fs from 'fs';
import * as path from 'path';

export const gameInfo = [
    new GameModel(
        'None',
        new Size(640, 960),
        'about:blank'
    ),
    new GameModel(
        '千年戦争アイギス',
        new Size(640, 960),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRl
        pZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cAVlUFAR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'aigis'
    ),
    new GameModel(
        '千年戦争アイギス R',
        new Size(640, 960),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cCV1EABB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'aigis'
    ),
    new GameModel(
        '御城プロジェクト:RE',
        new Size(720, 1275),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1EAVlQGAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
        'oshiro'
    ),
    new GameModel(
        '艦これ',
        new Size(720, 1200),
        `https://www.dmm.com/my/-/login/logout/=/path=DRVESVwZTlVZCFRLHVILWk8GWVsfXQFNAwtbSVkEWVMK
        DVxcSV8PQUwEXVQMWx9WERULBxZXC00LBF4FUxFeXwtcAQ__`,
        'kankore'
    ),
    new GameModel(
        '凍京Necro',
        new Size(640, 1136),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=DRVESVwZTlVZCFRLHVILWk8GWRhaSUtdBxZWD15KW
        VUGE19mFUMIUVEBVGdeXxVECApYaUIWDVcRFlYKXlpaSQQRQARXEA9dTAxXUVBXEl4OCwsH`,
        'necro'
    ),
    // new GameModel(
    //     '神姫プロジェクト',
    //     new Size(640, 960),
    //     `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
    //     AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1ECUlcGBx9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    //     'kamihime'
    // ),
    // new GameModel(
    //     '神姫プロジェクト R',
    //     new Size(640, 960),
    //     `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
    //     AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1QDU1AOAh9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    //     'kamihime'
    // ),
    // new GameModel(
    //     '神姬計劃',
    //     new Size(640, 960),
    //     `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
    //     AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1AAVVIHBR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    //     'kamihime'
    // ),
    // new GameModel(
    //     '神姬計劃 X',
    //     new Size(640, 960),
    //     `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGA
    //     AVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1AEU1AEAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    //     'kamihime'
    // ),
    new GameModel(
        'グランブルーファンタジー',
        new Size(820, 480),
        'http://game.granbluefantasy.jp',
        'granblue'
    ),
    new GameModel(
        'ブレイヴガールＲ',
        new Size(576, 1024),
        `http://bg-r.mimolette.co.jp/selectsvr.html`,
        'bravegirl'
    ),
    new GameModel(
        'UNITIA X',
        new Size(640, 1136),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=
        DRVESVwZTlVZCFRLHVILWk8GWRhaSUtdBxZWD15KQl4MFVlYHhkIXEsRUFRfCQtOABVGCwEfClYWC1EPUQRDWQoPDQg_`,
        'unitia'
    )
]


@Injectable()
export class GameService {
    private webView = null;
    public GameInfo = gameInfo;
    public CurrentGame: GameModel;
    private zoom = 100;
    private pluginService: PluginService;
    constructor(
        private electronService: ElectronService,
        private translateService: TranslateService,
        private message: ElMessageService,
        private globalStatus: GlobalStatusService,
        private globalSetting: GlobalSettingService,
    ) {
        this.CurrentGame = this.globalStatus.GlobalStatusStore.Get('CurrentGame').Value
        this.globalStatus.GlobalStatusStore.Get('SelectedAccount').Subscribe((v) => {
            this.ReloadGame()
        })
        this.globalStatus.GlobalStatusStore.Get('Mute').Subscribe((v) => {
            this.setAudioMuted(v);
        })
        this.globalStatus.GlobalStatusStore.Get('Zoom').Subscribe((v) => {
            this.SetZoom(v);
        })
        this.globalStatus.GlobalStatusStore.Get('CurrentGame').Subscribe((v) => {
            this.LoadGame(v);
        })
    }
    set WebView(webView) {
        this.webView = webView;
    }
    get WebView() {
        return this.webView;
    }
    Reload() {
        if (this.webView) {
            this.webView.reload();
        }
    }
    SetPluginService(pluginService: PluginService) {
        this.pluginService = pluginService;
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
    LoadGame(game: GameModel) {
        if (this.webView && game.Name !== 'None') {
            // 通知webView跳转页面
            this.webView.loadURL(game.URL);
            // 修改Electron的窗口大小
            this.electronService.ReSize(new Size(
                Math.floor(game.Size.Height * (this.zoom / 100)),
                Math.floor(game.Size.Width * (this.zoom / 100))
            ));
            this.pluginService.DeactiveEmbedPlugin('left'); this.pluginService.DeactiveEmbedPlugin('right');
            this.CurrentGame = game;
            this.pluginService.emitEvent('load-game', game);
            document.title = <string>game.Name;
        }
    }
    submitClickEvent(x: number, y: number) {
        if (this.webView) {
            const webContents = this.webView.getWebContents();
            if (webContents) {
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
                    }, 50 + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 10);
                }, 1);
            }
        }
    }
    KeyMapperTrigger(keyName) {
        const keyMapper = KeyMapperList.find(v => v.Name === keyName);
        if (!keyMapper) { return; }
        const x = Math.floor(keyMapper.X + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Width);
        const y = Math.floor(keyMapper.Y + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Height);
        this.submitClickEvent(x, y);
    }
    ScreenShot(save = false) {
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
                    width: Math.floor(webviewMeta.captureWidth *
                        this.electronService.electron.screen.getPrimaryDisplay().scaleFactor *
                        (this.zoom / 100)),
                    height: Math.floor(webviewMeta.captureHeight *
                        this.electronService.electron.screen.getPrimaryDisplay().scaleFactor *
                        (this.zoom / 100))
                };
                this.webView.capturePage(captureRect, (image: NativeImage) => {
                    if (save) {
                        const p = path.join(this.electronService.APP.getPath('userData'), 'screenshots');
                        if (!fs.existsSync(p)) {
                            fs.mkdirSync(p);
                        }
                        const fileName = path.join(p, `${(new Date).getTime()}.png`);
                        fs.writeFile(fileName, image.toPNG(), () => { });
                    } else {
                        this.electronService.clipboard.writeImage(image);
                    }
                });
            });
            if (save) {
                this.translateService.get('MESSAGE.SCREENSHOT-SAVE-SUCCESS').subscribe(res => {
                    this.message['success'](res);
                });
            } else {
                this.translateService.get('MESSAGE.SCREENSHOT-SUCCESS').subscribe(res => {
                    this.message['success'](res);
                });
            }
        }
    }
    SetZoom(zoom) {
        this.zoom = zoom;
    }
}
