import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GlobalSettingService } from '../global/globalSetting.service';
import { ElectronService } from './electron.service';

@Injectable()
export class HotkeyService {
  constructor(
    private gameService: GameService,
    private globalSettingService: GlobalSettingService,
    private electronService: ElectronService
  ) {}

  triggerHotKey(code: string) {
    if (this.globalSettingService.GlobalSetting.SpeedUpKey === code) {
      this.gameService.KeyMapperTrigger('SpeedUpKey');
    }
    if (this.globalSettingService.GlobalSetting.UseSkillKey === code) {
      this.gameService.KeyMapperTrigger('UseSkillKey');
    }
    if (this.globalSettingService.GlobalSetting.ScreenShotKey === code) {
      this.gameService.ScreenShot();
    }
    if (this.globalSettingService.GlobalSetting.ReloadKey === code) {
      this.gameService.Reload();
    }
  }
}
