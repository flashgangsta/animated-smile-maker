var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Bitmap_image;
import { DisplayObject } from "./DisplayObject.js";
export class Bitmap extends DisplayObject {
    get image() {
        return __classPrivateFieldGet(this, _Bitmap_image, "f");
    }
    constructor(image = null) {
        super();
        _Bitmap_image.set(this, null);
        __classPrivateFieldSet(this, _Bitmap_image, image, "f");
        this.width = image.width;
        this.height = image.height;
    }
}
_Bitmap_image = new WeakMap();
//# sourceMappingURL=Bitmap.js.map