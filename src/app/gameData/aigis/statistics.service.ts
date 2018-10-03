import { Injectable } from '@angular/core';
import { AigisGameDataService } from './aigis.service';
import { SpoilsStatistics } from './statistics/spoils.statistics'
import { HttpClient } from '@angular/common/http'
import { GlobalConfig } from '../../global/config'

@Injectable()
export class AigisStatisticsService {
    private spoilsReport: SpoilsStatistics;
    constructor(
        private aigisGameDataService: AigisGameDataService,
        private http: HttpClient
    ) {
        this.spoilsReport = new SpoilsStatistics(this);
        this.spoilsReport.subscribData(this.aigisGameDataService);
    }
    async sendRecord(record) {
        const url = `http://${GlobalConfig.Host}/statistics/aigis`;
        return this.http.post(url, JSON.stringify(record)).subscribe(response => {
            console.log(response);
         });
    }
    getStats(label) {
        switch(label) {
            case 'spoils':
            return this.spoilsReport
        }
    }
}
