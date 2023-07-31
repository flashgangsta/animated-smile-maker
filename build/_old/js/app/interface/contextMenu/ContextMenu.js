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
var _ContextMenu_instances, _ContextMenu_closeCallback, _ContextMenu_onWindowBlur;
import { ContextMenuButton } from "./ContextMenuButton.js";
import { CustomElement } from "../CustomElement.js";
import { EventListener } from "../../models/EventListener.js";
import { Events } from "../../Events.js";
export class ContextMenu extends CustomElement {
    constructor(contextData, closeCallback = null) {
        super();
        _ContextMenu_instances.add(this);
        _ContextMenu_closeCallback.set(this, void 0);
        __classPrivateFieldSet(this, _ContextMenu_closeCallback, closeCallback, "f");
        this.classList.add("context-menu");
        Object.keys(contextData).forEach((el) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });
        this.listenEvents(new EventListener(window, Events.BLUR, (event) => __classPrivateFieldGet(this, _ContextMenu_instances, "m", _ContextMenu_onWindowBlur).call(this, event)));
    }
    remove() {
        super.remove();
    }
}
_ContextMenu_closeCallback = new WeakMap(), _ContextMenu_instances = new WeakSet(), _ContextMenu_onWindowBlur = function _ContextMenu_onWindowBlur(event) {
    __classPrivateFieldGet(this, _ContextMenu_closeCallback, "f") && __classPrivateFieldGet(this, _ContextMenu_closeCallback, "f").call(this);
};
customElements.define("context-menu-el", ContextMenu);
//# sourceMappingURL=ContextMenu.js.map