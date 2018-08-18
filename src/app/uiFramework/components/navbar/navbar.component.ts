import { Component } from '@angular/core';
import { ElectronService } from '../../../core/electron.service'

@Component({
    selector: 'app-uiframe-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class UIFrameNavbarComponent {
    toggle = false;
    constructor(private electronService: ElectronService) {
    }
    minimize() {
        this.electronService.currentWindow.minimize();
    }
    close() {
        this.electronService.APP.exit(0);
    }
}
