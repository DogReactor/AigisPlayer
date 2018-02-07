import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalStatusService } from '../global/globalStatus.service';

@Component({
    selector: 'app-uiframe',
    templateUrl: './uiframework.component.html',
    styleUrls: ['./uiframework.component.scss']
})
export class UIFrameComponent {
    constructor(private globalStatusService: GlobalStatusService) {

    }
}
