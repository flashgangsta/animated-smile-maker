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
var _Tween_instances, _a, _Tween_framerate, _Tween_tickTimer, _Tween_currentFrame, _Tween_startsFromFrame, _Tween_totalFrames, _Tween_lastFrame, _Tween_el, _Tween_properties, _Tween_propertiesKeysList, _Tween_startValues, _Tween_targetValues, _Tween_distances, _Tween_easingFunction, _Tween_onCompleteCallback, _Tween_isComplete, _Tween_isInit, _Tween_setProperties;
import { Easing } from "./Easing.js";
export class Tween {
    constructor(el, properties, easing = Easing.LINEAR, duration, delay = 0, onComplete = null) {
        _Tween_instances.add(this);
        _Tween_currentFrame.set(this, 0);
        _Tween_startsFromFrame.set(this, void 0);
        _Tween_totalFrames.set(this, void 0);
        _Tween_lastFrame.set(this, void 0);
        _Tween_el.set(this, void 0);
        _Tween_properties.set(this, void 0);
        _Tween_propertiesKeysList.set(this, void 0);
        _Tween_startValues.set(this, {});
        _Tween_targetValues.set(this, {});
        _Tween_distances.set(this, {});
        _Tween_easingFunction.set(this, void 0);
        _Tween_onCompleteCallback.set(this, void 0);
        _Tween_isComplete.set(this, false);
        _Tween_isInit.set(this, false);
        __classPrivateFieldSet(this, _Tween_startsFromFrame, Math.round(delay / __classPrivateFieldGet(Tween, _a, "f", _Tween_tickTimer)) || 1, "f");
        __classPrivateFieldSet(this, _Tween_totalFrames, Math.round(duration / __classPrivateFieldGet(Tween, _a, "f", _Tween_tickTimer)) || 1, "f");
        __classPrivateFieldSet(this, _Tween_lastFrame, __classPrivateFieldGet(this, _Tween_startsFromFrame, "f") + __classPrivateFieldGet(this, _Tween_totalFrames, "f"), "f");
        __classPrivateFieldSet(this, _Tween_propertiesKeysList, Object.keys(properties), "f");
        __classPrivateFieldSet(this, _Tween_el, el, "f");
        __classPrivateFieldSet(this, _Tween_easingFunction, easing, "f");
        __classPrivateFieldSet(this, _Tween_onCompleteCallback, onComplete, "f");
        __classPrivateFieldSet(this, _Tween_properties, properties, "f");
    }
    static init(framerate = 120) {
        __classPrivateFieldSet(Tween, _a, framerate, "f", _Tween_framerate);
        __classPrivateFieldSet(Tween, _a, 1000 / __classPrivateFieldGet(Tween, _a, "f", _Tween_framerate), "f", _Tween_tickTimer);
    }
    get el() {
        return __classPrivateFieldGet(this, _Tween_el, "f");
    }
    get isComplete() {
        return __classPrivateFieldGet(this, _Tween_isComplete, "f");
    }
    reset() {
        __classPrivateFieldSet(this, _Tween_isComplete, false, "f");
        __classPrivateFieldSet(this, _Tween_currentFrame, 0, "f");
    }
    goToFrame(frameNum) {
        if (frameNum < 1)
            frameNum = 1;
        __classPrivateFieldSet(this, _Tween_currentFrame, frameNum, "f");
        __classPrivateFieldGet(this, _Tween_instances, "m", _Tween_setProperties).call(this);
    }
}
_a = Tween, _Tween_currentFrame = new WeakMap(), _Tween_startsFromFrame = new WeakMap(), _Tween_totalFrames = new WeakMap(), _Tween_lastFrame = new WeakMap(), _Tween_el = new WeakMap(), _Tween_properties = new WeakMap(), _Tween_propertiesKeysList = new WeakMap(), _Tween_startValues = new WeakMap(), _Tween_targetValues = new WeakMap(), _Tween_distances = new WeakMap(), _Tween_easingFunction = new WeakMap(), _Tween_onCompleteCallback = new WeakMap(), _Tween_isComplete = new WeakMap(), _Tween_isInit = new WeakMap(), _Tween_instances = new WeakSet(), _Tween_setProperties = function _Tween_setProperties() {
    //if(this.#isComplete) return;
    if (__classPrivateFieldGet(this, _Tween_currentFrame, "f") < __classPrivateFieldGet(this, _Tween_startsFromFrame, "f")) {
        //wait delay
        return;
    }
    else if (!__classPrivateFieldGet(this, _Tween_isInit, "f") && __classPrivateFieldGet(this, _Tween_currentFrame, "f") === __classPrivateFieldGet(this, _Tween_startsFromFrame, "f")) {
        //starts animation
        __classPrivateFieldGet(this, _Tween_propertiesKeysList, "f").forEach((key) => {
            __classPrivateFieldGet(this, _Tween_startValues, "f")[key] = __classPrivateFieldGet(this, _Tween_el, "f")[key];
            __classPrivateFieldGet(this, _Tween_targetValues, "f")[key] = __classPrivateFieldGet(this, _Tween_properties, "f")[key];
            __classPrivateFieldGet(this, _Tween_distances, "f")[key] = __classPrivateFieldGet(this, _Tween_properties, "f")[key] - __classPrivateFieldGet(this, _Tween_el, "f")[key];
        });
        __classPrivateFieldSet(this, _Tween_isInit, true, "f");
    }
    const el = __classPrivateFieldGet(this, _Tween_el, "f");
    const position = __classPrivateFieldGet(this, _Tween_isComplete, "f") ? 1 : __classPrivateFieldGet(this, _Tween_easingFunction, "f").call(this, (__classPrivateFieldGet(this, _Tween_currentFrame, "f") - __classPrivateFieldGet(this, _Tween_startsFromFrame, "f")) / __classPrivateFieldGet(this, _Tween_totalFrames, "f"));
    __classPrivateFieldGet(this, _Tween_propertiesKeysList, "f").forEach((key) => {
        el[key] = __classPrivateFieldGet(this, _Tween_isComplete, "f") ? el[key] : __classPrivateFieldGet(this, _Tween_startValues, "f")[key] + (__classPrivateFieldGet(this, _Tween_distances, "f")[key] * position);
    });
    if (__classPrivateFieldGet(this, _Tween_currentFrame, "f") === __classPrivateFieldGet(this, _Tween_lastFrame, "f")) {
        __classPrivateFieldSet(this, _Tween_isComplete, true, "f");
        __classPrivateFieldGet(this, _Tween_onCompleteCallback, "f") && __classPrivateFieldGet(this, _Tween_onCompleteCallback, "f").call(this, this);
    }
};
_Tween_framerate = { value: void 0 };
_Tween_tickTimer = { value: void 0 };
//# sourceMappingURL=Tween.js.map