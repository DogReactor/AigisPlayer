import { Component, Input } from '@angular/core';
import { ElectronService } from '../../../core/electron.service';

@Component({
  selector: 'app-uiframe-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class UIFrameNavbarComponent {
  @Input() dialogToggle: Function;
  appVersion: string;
  constructor(private electronService: ElectronService) {
    this.appVersion = this.electronService.APP.getVersion();
  }

  minimize() {
    this.electronService.currentWindow.minimize();
  }

  toggle() {
    if (this.dialogToggle) {
      this.dialogToggle('navbar');
    }
  }
}
