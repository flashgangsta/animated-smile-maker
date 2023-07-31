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
var _EventListener_target, _EventListener_type, _EventListener_handler;
export class EventListener {
    constructor(target, type, handler, options = null) {
        _EventListener_target.set(this, void 0);
        _EventListener_type.set(this, void 0);
        _EventListener_handler.set(this, void 0);
        __classPrivateFieldSet(this, _EventListener_target, target, "f");
        __classPrivateFieldSet(this, _EventListener_type, type, "f");
        __classPrivateFieldSet(this, _EventListener_handler, handler, "f");
        target.addEventListener(type, handler, options);
        /*console.log(target);
        console.log(type);
        console.log(handler);
        console.log(options);
        console.log("=========");*/
    }
    get type() {
        return __classPrivateFieldGet(this, _EventListener_type, "f");
    }
    get handler() {
        return __classPrivateFieldGet(this, _EventListener_handler, "f");
    }
    dispose() {
        __classPrivateFieldGet(this, _EventListener_target, "f").removeEventListener(__classPrivateFieldGet(this, _EventListener_type, "f"), __classPrivateFieldGet(this, _EventListener_handler, "f"));
        __classPrivateFieldSet(this, _EventListener_target, null, "f");
        __classPrivateFieldSet(this, _EventListener_type, null, "f");
        __classPrivateFieldSet(this, _EventListener_handler, null, "f");
    }
}
_EventListener_target = new WeakMap(), _EventListener_type = new WeakMap(), _EventListener_handler = new WeakMap();
//# sourceMappingURL=EventListener.js.map