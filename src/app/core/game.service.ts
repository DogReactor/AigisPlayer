import { Injectable } from '@angular/core';
import { Size } from './util';
import { GameModel } from './game.model';
import { ElectronService } from './electron.service';
import { KeyMapperList } from './keyMapper';
import { Rectangle, NativeImage, WebviewTag, WebContents } from 'electron';
import { ElMessageService } from 'element-angular';
import { TranslateService } from '@ngx-translate/core';
import { PluginService } from './plugin.service';
import { GlobalStatusService } from '../global/globalStatus.service';
import { GlobalSettingService } from '../global/globalSetting.service';
import * as fs from 'fs';
import * as path from 'path';
import { AigisGameDataService } from '../gameData/aigis/aigis.service';
import { HotkeyService } from './hotkey.service';

export const gameInfo = [
  new GameModel('None', new Size(640, 960), 'about:blank'),
  new GameModel(
    '千年戦争アイギス',
    new Size(640, 960),
    `https://accounts.dmm.com/service/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cAVlUFAR9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    'aigis'
  ),
  new GameModel(
    '千年戦争アイギス R',
    new Size(640, 960),
    `https://accounts.dmm.co.jp/service/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1cCV1EABB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    'aigis'
  ),
  new GameModel(
    'FLOWER KNIGHT GIRL',
    new Size(640, 1136),
    `https://accounts.dmm.com/service/logout/=/path=DRVESVwZTlVZCFRLHVILWk8GWVsfXQFNAwtbSVQJWEcAEx9QCEUVU1QJDlVKVxZHXFQQWF9NDV8LAVYSWwpZDVQ_`,
    'fkg'
  ),
  new GameModel(
    'FLOWER KNIGHT GIRL ~X指定~',
    new Size(640, 1136),
    `https://accounts.dmm.co.jp/service/logout/=/path=DRVESVwZTlVZCFRLHVILWk8GWRhaSUtdBxZWD15KUVwKFlVLS05OW1YWRVlfWllaGARGRg0IQlcNFl4AWwZWRAwOXgRX`,
    'fkg'
  ),
  new GameModel(
    '御城プロジェクト:RE',
    new Size(720, 1275),
    `https://accounts.dmm.com/service/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1EAVlQGAB9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    'oshiro'
  ),
  new GameModel(
    'モンスター娘TD',
    new Size(640, 1136),
    'https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVldFgBcFgNeCh0IWF4IFENMElJOW1YWRVlfWllZDhFfUFlaBU0LDVlbA0NaSQQRQARXEBFAVwNYVFZpFVwIFQsH',
    'monster'
  ),
  new GameModel(
    'モンスター娘TD X',
    new Size(640, 1136),
    'https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVkeUxQWBgdDB1sJGF0KD11MFUMVVkBKWFZAQgdbDVpYWURQAlABA0MPXQsKAUMMSVgWRlwDHhVDV1VfClI*Fl1fQARV',
    'monster'
  ),
  // Start
  new GameModel(
    'れじぇくろ！',
    new Size(720, 1282),
    `https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVkeUxQWBgdDB1sJGFwABlVaClkZHVELQkxSWgoIDwpCX1ZQB1gWC1gID1QRXRwAQElbB0dCSgpXUV9TOUQKDEYLAQ__`,
    'clover'
  ),
  new GameModel(
    'エンジェリックリンク',
    new Size(630, 1138),
    `https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVkeUxQWBgdDB1sJGFELBlVVD1UTHVELQkxSWgoIDwpCX1ZQB1gWC1gID1QRXRwAQElbB0dCSgpXUV9TOUQKDEYLAQ__`,
    'angelic'
  ),
  new GameModel(
    'ミナシゴノシゴト',
    new Size(720, 1280),
    `https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVkeUxQWBgdDB1sJGF0MD1FKDl8GXWcdHlFdRRJWDQkJWF9NDV8LAVYSWwpZDVRHXUAHRhEPCUNBSlxQD1sEOkVdWUlZCA__`,
    'minashigo'
  ),
  new GameModel(
    'ふるーつふるきゅーと！',
    new Size(635, 1136),
    `https://accounts.dmm.com/service/logout/=/path=DRVESRUMTh1fBFxdQBgCWgxLVVkeUxQWBgdDB1sJGFYXFFZMCmkTHVELQkxSWgoIDwpCX1ZQB1gWC1gID1QRXRwAQElbB0dCSgpXUV9TOUQKDEYLAQ__`,
    'fruful'
  ),
  // End
  new GameModel(
    '艦これ',
    new Size(720, 1200),
    `https://accounts.dmm.com/service/logout/=/path=DRVESVwZTlVZCFRLHVILWk8GWVsfXQFNAwtbSVkEWVMKDVxcSV8PQUwEXVQMWx9WERULBxZXC00LBF4FUxFeXwtcAQ__`,
    'kankore'
  ),
  new GameModel(
    '神姫プロジェクト',
    new Size(640, 960),
    `https://accounts.dmm.com/service/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1ECUlcGBx9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    'kamihime'
  ),
  new GameModel(
    '神姫プロジェクト R',
    new Size(640, 960),
    `https://accounts.dmm.co.jp/service/logout/=/path=Sg9VTQFXDFcXFl5bWlcKGAAVRlpZWgVNCw1ZSR9KU1URAFlVSQtOU0gVblFXC1QDU1AOAh9XC00LBF4FUxFeXwtcARYLTwBCSFgAF1JVEgoIC0VCUVUIFg__`,
    'kamihime'
  )
];

@Injectable()
export class GameService {
  private webView: WebviewTag | null = null;
  public GameInfo = gameInfo;
  public CurrentGame: GameModel;
  private zoom = 100;
  private pluginService: PluginService;
  private slowTick = false;
  public frameID = -1;
  public webContents: WebContents;
  constructor(
    private electronService: ElectronService,
    private translateService: TranslateService,
    private message: ElMessageService,
    private globalStatus: GlobalStatusService,
    private globalSetting: GlobalSettingService,
    private aigisService: AigisGameDataService
  ) {
    this.CurrentGame = this.globalStatus.GlobalStatusStore.Get('CurrentGame').Value;
    this.globalStatus.GlobalStatusStore.Get('SelectedAccount').Subscribe(v => {
      this.ReloadGame();
    });
    this.globalStatus.GlobalStatusStore.Get('Mute').Subscribe(v => {
      this.setAudioMuted(v);
    });
    this.globalStatus.GlobalStatusStore.Get('Zoom').Subscribe(v => {
      this.SetZoom(v);
    });
    this.globalStatus.GlobalStatusStore.Get('CurrentGame').Subscribe(v => {
      this.LoadGame(v);
    });

    // 监听aigis事件
    this.aigisService.subscribe('quest-start', () => {
      this.electronService.FlashFrame();
    });
  }
  set WebView(webView) {
    this.webView = webView;
    const domReadyCallback = () => {
      webView.removeEventListener('dom-ready', domReadyCallback);
      this.webContents = this.electronService.remote.webContents.fromId(webView.getWebContentsId());
      this.webContents.setBackgroundThrottling(false);
      this.webContents.setWindowOpenHandler((details) => {
        const option: Electron.BrowserWindowConstructorOptions = {
          height: 640,
          width: 1100,
          autoHideMenuBar: true,
          webPreferences: {
            session: this.webContents.session
          }
        };
        this.electronService.CreateBrowserWindow(details.url, option);
        return { action: 'deny' }
      })
      this.webContents.on('before-input-event', (event, input) => {
        if (input.type !== 'keyUp') {
          return;
        }
        if (input.key !== '' && input.code === '') {
          return;
        }
        this.triggerHotKey(input.code);
      });
    };
    webView.addEventListener('dom-ready', domReadyCallback);
  }
  get WebView() {
    return this.webView;
  }
  set SlowTick(value: boolean) {
    this.slowTick = value;
    this.emitEvent('aigis-tick', [value]);
  }
  get SlowTick() {
    return this.slowTick;
  }
  Pause() {
    if (this.CurrentGame.Spec === "aigis") {
      this.emitEvent('aigis-pause');
    }
  }
  BulletTime() {
    this.SlowTick = !this.SlowTick;
  }
  emitEvent(channel: string, args?: Array<any>) {
    if (!this.webView || this.frameID === -1) {
      return;
    }
    this.webContents.sendToFrame(this.frameID, channel, ...args);
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
      this.webView.setAudioMuted(enable);
    }
  }
  LoadGame(game: GameModel) {
    if (this.webView && game.Name !== 'None') {
      // 通知webView跳转页面
      this.webView.loadURL(game.URL);
      // 修改Electron的窗口大小
      this.electronService.ReSize(
        new Size(Math.floor(game.Size.Height * (this.zoom / 100)), Math.floor(game.Size.Width * (this.zoom / 100)))
      );
      // this.pluginService.DeactiveEmbedPlugin('left');
      // this.pluginService.DeactiveEmbedPlugin('right');
      this.CurrentGame = game;
      this.pluginService.emitEvent('load-game', game);
      document.title = <string>game.Name;
    }
  }
  submitClickEvent(x: number, y: number) {
    if (this.webView) {
      const webContents = this.webContents;
      if (webContents) {
        setTimeout(() => {
          webContents.sendInputEvent({
            type: 'mouseDown',
            x: x,
            y: y,
            button: 'left',
            clickCount: 1,
            modifiers: []
          });
          setTimeout(() => {
            webContents.sendInputEvent({
              type: 'mouseUp',
              x: x,
              y: y,
              button: 'left',
              clickCount: 1,
              modifiers: []
            });
          }, 50 + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 10);
        }, 1);
      }
    }
  }
  triggerHotKey(code: string) {
    if (this.globalSetting.GlobalSetting.SpeedUpKey === code) {
      this.KeyMapperTrigger('SpeedUpKey');
    }
    if (this.globalSetting.GlobalSetting.UseSkillKey === code) {
      this.KeyMapperTrigger('UseSkillKey');
    }
    if (this.globalSetting.GlobalSetting.ScreenShotKey === code) {
      this.ScreenShot();
    }
    if (this.globalSetting.GlobalSetting.ReloadKey === code) {
      this.Reload();
    }
    if (this.globalSetting.GlobalSetting.BulletTimeKey === code) {
      this.BulletTime();
    }
    if (this.globalSetting.GlobalSetting.PauseKey === code) {
      console.log("pause");
      this.Pause();
    }
  }
  KeyMapperTrigger(keyName) {
    const keyMapper = KeyMapperList.find(v => v.Name === keyName);
    if (!keyMapper) {
      return;
    }
    const x = Math.floor(keyMapper.X + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Width);
    const y = Math.floor(keyMapper.Y + (Math.random() > 0.5 ? -1 : 1) * Math.random() * keyMapper.Height);
    this.submitClickEvent(x, y);
  }
  async ScreenShot(save = false) {
    if (this.webView) {
      const code = `var r = {}; \
                r.pageHeight = window.innerHeight; \
                r.pageWidth = window.innerWidth; \
                r;
                ;0
                `;
      const r = await this.webView.executeJavaScript(code, false);

      const webviewMeta = {
        captureHeight: 0,
        captureWidth: 0
      };
      webviewMeta.captureHeight = r.pageHeight;
      webviewMeta.captureWidth = r.pageWidth;
      const captureRect = {
        x: 0,
        y: 0,
        width: Math.floor(
          webviewMeta.captureWidth *
          this.electronService.remote.screen.getPrimaryDisplay().scaleFactor *
          (this.zoom / 100)
        ),
        height: Math.floor(
          webviewMeta.captureHeight *
          this.electronService.remote.screen.getPrimaryDisplay().scaleFactor *
          (this.zoom / 100)
        )
      };
      // Fuck Electron
      const image = await this.webContents.capturePage(captureRect);
      if (save) {
        const p = path.join(this.electronService.APP.getPath('userData'), 'screenshots');
        if (!fs.existsSync(p)) {
          fs.mkdirSync(p);
        }
        const fileName = path.join(p, `${new Date().getTime()}.png`);
        fs.writeFile(fileName, image.toPNG(), () => { });
      } else {
        this.electronService.clipboard.writeImage(image);
      }

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
