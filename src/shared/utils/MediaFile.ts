export class MediaFile {
    private _name: string;
    private _type: string;
    private _base64: string;
    constructor(name:string, type:string, base64:string) {
        this._name = name;
        this._type = type;
        this._base64 = base64;

    }
}