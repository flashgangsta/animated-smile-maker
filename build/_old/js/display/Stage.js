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
var _Stage_frameRate;
import { DisplayObjectContainer } from "./DisplayObjectContainer.js";
export class Stage extends DisplayObjectContainer {
    constructor() {
        super();
        _Stage_frameRate.set(this, 60);
    }
    get frameRate() { return __classPrivateFieldGet(this, _Stage_frameRate, "f"); }
    ;
    set frameRate(value) {
        __classPrivateFieldSet(this, _Stage_frameRate, Math.max(parseFloat(value), 0.01) || __classPrivateFieldGet(this, _Stage_frameRate, "f"), "f");
    }
}
_Stage_frameRate = new WeakMap();
//# sourceMappingURL=Stage.js.map