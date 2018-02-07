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
