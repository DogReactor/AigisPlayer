import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { UiFrameModule } from './uiFramework/uiframework.module'
import { UIFrameComponent } from './uiFramework/uiframework.component'
import { GlobalModule } from './global/global.module'
import { AppRoutingModule } from './app-routing.module'

import { HttpClientModule, HttpClient } from '@angular/common/http';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';

import { SharedModule } from './shared.module';
import { ElModule } from 'element-angular';
import { WebviewDirective } from './webview.directive';
import { GameDataModule } from './gameData/gamedata.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ElModule.forRoot(),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    CoreModule,
    GlobalModule,
    GameDataModule,
    UiFrameModule
  ],
  bootstrap: [AppComponent],
  exports: [WebviewDirective]
})
export class AppModule { }
