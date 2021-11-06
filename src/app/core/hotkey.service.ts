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
  ) { }
}
