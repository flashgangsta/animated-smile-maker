var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MediaFile_name, _MediaFile_base64, _MediaFile_type;
export class MediaFile {
    constructor(name, type, base64) {
        _MediaFile_name.set(this, void 0);
        _MediaFile_base64.set(this, void 0);
        _MediaFile_type.set(this, void 0);
        if (name || type || base64)
            this.write({ name, type, base64 });
    }
    write(data) {
        __classPrivateFieldSet(this, _MediaFile_name, data.name, "f");
        __classPrivateFieldSet(this, _MediaFile_base64, data.base64, "f");
        __classPrivateFieldSet(this, _MediaFile_type, data.type, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _MediaFile_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _MediaFile_name, value, "f");
    }
    get base64() {
        return __classPrivateFieldGet(this, _MediaFile_base64, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _MediaFile_type, "f");
    }
    toString() {
        return JSON.stringify(this.serializeObject());
    }
    serializeObject() {
        return {
            name: __classPrivateFieldGet(this, _MediaFile_name, "f"),
            type: __classPrivateFieldGet(this, _MediaFile_type, "f"),
            base64: __classPrivateFieldGet(this, _MediaFile_base64, "f")
        };
    }
    dispose() {
        //todo: dispose it
        __classPrivateFieldSet(this, _MediaFile_name, null, "f");
        __classPrivateFieldSet(this, _MediaFile_base64, null, "f");
        __classPrivateFieldSet(this, _MediaFile_type, null, "f");
    }
}
_MediaFile_name = new WeakMap(), _MediaFile_base64 = new WeakMap(), _MediaFile_type = new WeakMap();
//# sourceMappingURL=MediaFile.js.map