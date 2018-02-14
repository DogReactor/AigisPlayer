import { Size } from './util'

export class GameModel {
    public Name: string;
    public Size: Size;
    public URL: string;
    public Spec = ''

    constructor(name: string, size: Size, url: string, spec?: string) {
        this.Name = name;
        this.Size = size;
        this.URL = url;
        this.Spec = spec ? spec : ''
    }
}
