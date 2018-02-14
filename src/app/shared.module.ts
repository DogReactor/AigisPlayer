import { ElModule } from 'element-angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [ElModule, CommonModule, FormsModule, TranslateModule]
})
export class SharedModule { }
