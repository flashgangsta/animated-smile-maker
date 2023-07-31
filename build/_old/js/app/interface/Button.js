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
var _Button_disabled, _Button_label, _Button_icon;
import { CustomElement } from "./CustomElement.js";
export class Button extends CustomElement {
    constructor(label = null, iconPath = null) {
        super();
        _Button_disabled.set(this, false);
        _Button_label.set(this, void 0);
        _Button_icon.set(this, void 0);
        this.classList.add("button");
        if (label) {
            __classPrivateFieldSet(this, _Button_label, document.createElement("label"), "f");
            __classPrivateFieldGet(this, _Button_label, "f").innerText = label;
            this.append(__classPrivateFieldGet(this, _Button_label, "f"));
        }
        if (iconPath) {
            __classPrivateFieldSet(this, _Button_icon, new Image(), "f");
            __classPrivateFieldGet(this, _Button_icon, "f").src = iconPath;
            this.append(__classPrivateFieldGet(this, _Button_icon, "f"));
        }
    }
    get disabled() {
        return __classPrivateFieldGet(this, _Button_disabled, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _Button_disabled, !!value, "f");
        if (__classPrivateFieldGet(this, _Button_disabled, "f")) {
            this.setAttribute("disabled", "true");
        }
        else {
            this.removeAttribute("disabled");
        }
    }
    get label() {
        return __classPrivateFieldGet(this, _Button_label, "f").innerText;
    }
}
_Button_disabled = new WeakMap(), _Button_label = new WeakMap(), _Button_icon = new WeakMap();
//# sourceMappingURL=Button.js.map