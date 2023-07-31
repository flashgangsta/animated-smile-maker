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
var _DisplayObject_rotation;
export class DisplayObject {
    set rotation(value) {
        __classPrivateFieldSet(this, _DisplayObject_rotation, parseFloat(value) || 0, "f");
    }
    get rotation() { return __classPrivateFieldGet(this, _DisplayObject_rotation, "f"); }
    ;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        _DisplayObject_rotation.set(this, 0);
        this.name = null;
    }
}
_DisplayObject_rotation = new WeakMap();
//# sourceMappingURL=DisplayObject.js.map