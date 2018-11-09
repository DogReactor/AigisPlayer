import * as Rx from 'rxjs';
class State {
    Key: string;
    private value: any;
    private subject: Rx.Subject<any>;
    private type: string;
    constructor(key: string, value: any) {
        this.Key = key;
        this.value = value;
        this.subject = new Rx.Subject<any>();
        this.type = typeof value;
    }
    get Value() {
        return this.value;
    }
    public Dispatch(value) {
        if ((typeof value) !== this.type) {
            throw `Type ${typeof value} Does not match ${this.type}`;
        } else {
            this.value = value;
            this.subject.next(value);
        }
    }
    public Subscribe(callback: (v: any) => void) {
        callback(this.value);
        return this.subject.subscribe(callback);
    }
}

export class Store {
    private store: State[] = [];
    constructor(states?: {}) {
        if (!states) { return; }
        for (const key in states) {
            if (states.hasOwnProperty(key)) {
                this.Add(key, states[key]);
            }
        }
    }
    public Add(key, value) {
        const state = new State(key, value);
        this.store.push(state);
    }
    public Get(key) {
        const state = this.store.find((v) => { return v.Key === key })
        if (!state) { return null; } else {
            return state;
        }
    }
}
