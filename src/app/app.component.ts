import { Component } from '@angular/core';
import { ElectronService } from './core/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalStatusService } from './global/globalStatus.service';
import { GlobalSettingService } from './global/globalSetting.service';
import { GameService } from './core/game.service'
import { Langs } from './core/languageList'
import { HotkeyService } from './core/hotkey.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private globalStatusService: GlobalStatusService,
    private globalSettingService: GlobalSettingService,
    private gameService: GameService,
    private hotkeyService: HotkeyService) {

    // translation
    translate.addLangs(Langs);
    translate.setDefaultLang('cn');
    translate.use('cn');

    globalSettingService.Init();
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('electron is correctly injected?', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('nodeJs childProcess is correctly injected?', electronService.childProcess);
      console.log(electronService.electron.remote.BrowserWindow.getExtensions());
    } else {
      console.log('Mode web');
    }
  }
  keyup(event: KeyboardEvent) {
    this.hotkeyService.triggerHotKey(event);
  }
}
