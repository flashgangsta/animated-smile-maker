export class MediaFile {
    name;
    _type;
    _base64;
    constructor(name, type, base64) {
        this.name = name;
        this._type = type;
        this._base64 = base64;
    }
    get type() {
        return this._type;
    }
    get base64() {
        return this._base64;
    }
    serializeObject() {
        return {
            name: this.name,
            type: this.type,
            base64: this.base64
        };
    }
}
//# sourceMappingURL=MediaFile.js.map