import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uiframe-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() visible: boolean;
  @Input() title: string;
  @Input() okText: string;
  @Input() cancelText: string;
  @Input() onOk: Function;
  @Input() onCancel: Function;
}
