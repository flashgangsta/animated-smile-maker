export class MediaFile {
    private readonly _name: string;
    private readonly _type: string;
    private readonly _base64: string;

    constructor(name:string, type:string, base64:string) {
        this._name = name;
        this._type = type;
        this._base64 = base64;

    }

    public get name():string {
        return this._name;
    }
}