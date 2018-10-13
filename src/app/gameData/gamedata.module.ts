import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebuggerService } from './debugger.service';
import { AigisGameDataService } from './aigis/aigis.service';
import { AigisStatisticsService } from './aigis/statistics.service';



@NgModule({
    imports: [CommonModule],
    providers: [DebuggerService, AigisGameDataService, AigisStatisticsService]
})
export class GameDataModule {

}
