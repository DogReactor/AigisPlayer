import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx'

export class GlobalStatus {
}

@Injectable()
export class GlobalStatusService {
    public GlobalStatus = new GlobalStatus();
}
