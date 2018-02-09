export class Point {
    public X: number;
    public Y: number;
}

export class Size {
    public Height: number;
    public Width: number;

    constructor(height: number, width: number) {
        this.Height = height;
        this.Width = width;
    }
}

export function AddSetterToObject(object, callback: (v: any) => any) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            let newKey = key;
            if (newKey[0].toLowerCase() === newKey[0]) {
                continue;
            }
            newKey = newKey[0].toLowerCase() + newKey.substring(1);
            object[newKey] = object[key];
            Object.defineProperty(object, key, {
                set: function (v) {
                    this[newKey] = v;
                    callback(v);
                },
                get: function () {
                    return this[newKey];
                }
            })
        }
    }
}
