import { Injectable } from '@angular/core';
import { Size } from './util';
import { GameModel } from './game.model';
import { ElectronService } from './electron.service';

const gameInfo = [
    new GameModel(
        '千年戦争',
        new Size(640, 960),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRl
        pZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cAVlUFAR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    ),
    new GameModel(
        '千年戦争Ｒ',
        new Size(640, 960),
        `https://www.dmm.co.jp/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cCV1EABB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    ),
    new GameModel(
        '御城プロジェクト',
        new Size(720, 1275),
        `https://www.dmm.com/my/-/login/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAA
        VRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1EAVlQGAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`
    )
]


@Injectable()
export class GameService {
    private webView = null;
    public GameInfo = gameInfo;
    public CurrentGame: GameModel;
    constructor(private electronService: ElectronService) {
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
    LoadGame(index) {
        if (this.webView && index < gameInfo.length) {
            const game = gameInfo[index];
            this.CurrentGame = game;
            // 通知webView跳转页面
            this.webView.loadURL(game.URL);
            // 修改Electron的窗口大小
            this.electronService.ReSize(game.Size);
        }
    }
}
