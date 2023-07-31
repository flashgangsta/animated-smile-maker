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
var _Panel_panelsContainer, _Panel_panelHeader;
import { PanelHeader } from "./PanelHeader.js";
import { CustomElement } from "../CustomElement.js";
import { Container } from "../Container.js";
export class Panel extends CustomElement {
    constructor(...tabNames) {
        super();
        _Panel_panelsContainer.set(this, new Container());
        _Panel_panelHeader.set(this, void 0);
        __classPrivateFieldGet(this, _Panel_panelsContainer, "f").classList.add("panels-container");
        this.classList.add("panel");
        __classPrivateFieldSet(this, _Panel_panelHeader, new PanelHeader(tabNames), "f");
        this.append(__classPrivateFieldGet(this, _Panel_panelHeader, "f"), __classPrivateFieldGet(this, _Panel_panelsContainer, "f"));
    }
    get panelsContainer() {
        return __classPrivateFieldGet(this, _Panel_panelsContainer, "f");
    }
}
_Panel_panelsContainer = new WeakMap(), _Panel_panelHeader = new WeakMap();
//# sourceMappingURL=Panel.js.map