import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
    private webView = null;
    constructor() {

    }
    set WebView(webView) {
        this.webView = webView;
    }

    reload() {
        if (this.webView) {
            this.webView.reload();
        }
    }
}
