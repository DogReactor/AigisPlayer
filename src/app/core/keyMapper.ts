export class KeyMapper {
    X: number;
    Y: number;
    Width: number;
    Height: number;
    Name: string
    constructor(Name, X, Y, Width, Height) {
        this.Name = Name;
        this.X = X;
        this.Y = Y;
        this.Width = Width;
        this.Height = Height;
    }
}
export const KeyMapperList = [
    new KeyMapper('SpeedUpKey', 876, 39, 50, 20),
    new KeyMapper('UseSkillKey', 874, 589, 20, 10)
]
