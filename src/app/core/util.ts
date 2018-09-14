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

export function getArgs(func) {
    // 先用正则匹配,取得符合参数模式的字符串.
    // 第一个分组是这个:  ([^)]*) 非右括号的任意字符
    const args = func.toString().match(/\(([^)]*)\)/)[1];

    // 用逗号来分隔参数(arguments string).
    return args.split(',').map(function (arg) {
        // 去除注释(inline comments)以及空格
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function (arg) {
        // 确保没有 undefined.
        return arg;
    });
}
