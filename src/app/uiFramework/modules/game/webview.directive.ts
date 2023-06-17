import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'webview'
})
export class WebviewDirective {
  @Input() preload: string;
  constructor() { }
}
