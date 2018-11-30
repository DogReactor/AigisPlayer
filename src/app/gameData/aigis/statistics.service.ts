import { Injectable } from '@angular/core';
import { AigisGameDataService } from './aigis.service';
import { SpoilsStatistics } from './statistics/spoils.statistics'
import { HttpClient } from '@angular/common/http'
import { GlobalConfig } from '../../global/config'
import { GlobalSettingService } from '../../global/globalSetting.service'

@Injectable()
export class AigisStatisticsService {
    private spoilsReport: SpoilsStatistics;
    private subscription: Map<string, Array<(rec) => void>> = new Map();
    public DataCollectPermit = true;
    public DataCollectNoted = false;
    constructor(
        private globalSettingService: GlobalSettingService,
        private aigisGameDataService: AigisGameDataService,
        private http: HttpClient
    ) {
        if (window.localStorage.getItem('AnnouncedDataCollected')) {
            this.DataCollectNoted = JSON.parse(window.localStorage.getItem('AnnouncedDataCollected'))
        }
        this.DataCollectPermit = this.globalSettingService.GlobalSetting.DataCollectPermit;
        if (this.DataCollectPermit) {
            this.spoilsReport = new SpoilsStatistics(this);
            this.spoilsReport.subscribData(this.aigisGameDataService);
        }
    }
    async sendRecord(record) {
        if (this.subscription.has(record.type)) {
            this.subscription.get(record.type).forEach(func => {
                func(record);
            })
        }
        const url = `http://${GlobalConfig.Host}/statistics/aigis`;
        return this.http.post(url, record).subscribe(response => {
            console.log(response, record);
        });
    }
    subscribe(label, callback) {
        if (this.subscription.has(label)) {
            this.subscription.get(label).push(callback);
        } else {
            this.subscription.set(label, [callback]);
        }
    }
    confirmDataPermit() {
        this.DataCollectNoted = true;
        window.localStorage.setItem('AnnouncedDataCollected', JSON.stringify(this.DataCollectNoted))
    }
}
