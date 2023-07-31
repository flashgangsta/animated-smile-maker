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
var _TimelineContextMenu_instances, _TimelineContextMenu_topMargin, _TimelineContextMenu_frameX, _TimelineContextMenu_x, _TimelineContextMenu_y, _TimelineContextMenu_addedToDOM;
import { ContextMenu } from "../contextMenu/ContextMenu.js";
import { EventListener } from "../../models/EventListener.js";
import { Events } from "../../Events.js";
export class TimelineContextMenu extends ContextMenu {
    constructor(x, menuContent, closeCallback) {
        super(menuContent, closeCallback);
        _TimelineContextMenu_instances.add(this);
        _TimelineContextMenu_topMargin.set(this, -20);
        _TimelineContextMenu_frameX.set(this, 0);
        _TimelineContextMenu_x.set(this, 0);
        _TimelineContextMenu_y.set(this, 0);
        __classPrivateFieldSet(this, _TimelineContextMenu_frameX, x, "f");
        this.listenEvents(new EventListener(this, Events.ADDED_TO_DOM, (event) => __classPrivateFieldGet(this, _TimelineContextMenu_instances, "m", _TimelineContextMenu_addedToDOM).call(this, event)));
    }
    setOffset(x, y) {
        __classPrivateFieldSet(this, _TimelineContextMenu_x, x + __classPrivateFieldGet(this, _TimelineContextMenu_frameX, "f"), "f");
        __classPrivateFieldSet(this, _TimelineContextMenu_y, y + __classPrivateFieldGet(this, _TimelineContextMenu_topMargin, "f"), "f");
        this.style.top = `${__classPrivateFieldGet(this, _TimelineContextMenu_y, "f")}px`;
        this.style.left = `${__classPrivateFieldGet(this, _TimelineContextMenu_x, "f")}px`;
    }
}
_TimelineContextMenu_topMargin = new WeakMap(), _TimelineContextMenu_frameX = new WeakMap(), _TimelineContextMenu_x = new WeakMap(), _TimelineContextMenu_y = new WeakMap(), _TimelineContextMenu_instances = new WeakSet(), _TimelineContextMenu_addedToDOM = function _TimelineContextMenu_addedToDOM(event) {
    const rect = this.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (rect.right > windowWidth) {
        this.style.left = `${Math.round(__classPrivateFieldGet(this, _TimelineContextMenu_x, "f") - rect.width)}px`;
    }
    if (rect.bottom > windowHeight) {
        this.style.top = `${__classPrivateFieldGet(this, _TimelineContextMenu_y, "f") - (rect.bottom - windowHeight) + __classPrivateFieldGet(this, _TimelineContextMenu_topMargin, "f")}px`;
    }
};
customElements.define("timeline-context-menu", TimelineContextMenu);
//# sourceMappingURL=TimelineContextMenu.js.map