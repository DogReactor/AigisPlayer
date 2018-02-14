import { Size } from './util'

export class GameModel {
    public Name: String;
    public Size: Size;
    public URL: String;
    public Spec = ''

    constructor(name: String, size: Size, url: String, spec?: string) {
        this.Name = name;
        this.Size = size;
        this.URL = url;
        this.Spec = spec ? spec : ''
    }
}
