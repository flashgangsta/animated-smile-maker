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
var _MenuContextMenu_menuButton;
import { ContextMenu } from "../contextMenu/ContextMenu.js";
export class MenuContextMenu extends ContextMenu {
    constructor(menuButton, contextData, closeCallback) {
        super(contextData, closeCallback);
        _MenuContextMenu_menuButton.set(this, void 0);
        __classPrivateFieldSet(this, _MenuContextMenu_menuButton, menuButton, "f");
        this.style.left = menuButton.offsetLeft + "px";
    }
    get menuButtonLabel() {
        return __classPrivateFieldGet(this, _MenuContextMenu_menuButton, "f").label;
    }
    remove() {
        __classPrivateFieldSet(this, _MenuContextMenu_menuButton, null, "f");
        super.remove();
    }
}
_MenuContextMenu_menuButton = new WeakMap();
customElements.define("menu-context-menu-el", MenuContextMenu);
//# sourceMappingURL=MenuContextMenu.js.map