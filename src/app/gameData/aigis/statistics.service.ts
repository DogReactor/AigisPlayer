import { Injectable } from '@angular/core';
import { AigisGameDataService } from './aigis.service';
import { SpoilsStatistics } from './statistics/spoils.statistics'
import { HttpClient } from '@angular/common/http'
import { GlobalConfig } from '../../global/config'
import { GlobalSettingService } from '../../global/globalSetting.service'

@Injectable()
export class AigisStatisticsService {
    private spoilsReport: SpoilsStatistics;
    public DataCollectPermit = true;
    public DataCollectNoted = false;
    constructor(
        private globalSettingService: GlobalSettingService,
        private aigisGameDataService: AigisGameDataService,
        private http: HttpClient
    ) {
        if (window.localStorage.getItem('AnnounceDataCollected')) {
            this.DataCollectNoted = JSON.parse(window.localStorage.getItem('AnnouncedDataCollected'))
        }
        this.DataCollectPermit = this.globalSettingService.GlobalSetting.DataCollectPermit;
        if (this.DataCollectPermit) {
            this.spoilsReport = new SpoilsStatistics(this);
            this.spoilsReport.subscribData(this.aigisGameDataService);
        }
    }
    async sendRecord(record) {
        const url = `http://${GlobalConfig.Host}/statistics/aigis`;
        return this.http.post(url, JSON.stringify(record)).subscribe(response => {
            console.log(response);
        });
    }
    getStats(label) {
        switch (label) {
            case 'spoils':
                return this.spoilsReport.History
        }
    }
    confirmDataPermit() {
        this.DataCollectNoted = true;
        window.localStorage.setItem('AnnouncedDataCollected', JSON.stringify(this.DataCollectNoted))
    }
}
