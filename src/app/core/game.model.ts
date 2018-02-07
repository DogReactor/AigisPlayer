import { Size } from './util'

export class GameModel {
    public Name: String;
    public Size: Size;
    public URL: String;

    constructor(name: String, size: Size, url: String) {
        this.Name = name;
        this.Size = size;
        this.URL = url;
    }
}
