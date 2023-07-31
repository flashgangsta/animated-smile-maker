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
var _ListElementWithRenameLabel_instances, _ListElementWithRenameLabel_lastLabelText, _ListElementWithRenameLabel_labelEl, _ListElementWithRenameLabel_setLabelEditable, _ListElementWithRenameLabel_onLabelKeydown, _ListElementWithRenameLabel_onLabelFocusOut, _ListElementWithRenameLabel_onLabelChanged;
import { CustomElement } from "./CustomElement.js";
import { EventListener } from "../models/EventListener.js";
import { Events } from "../Events.js";
export class ListElementWithRenameLabel extends CustomElement {
    constructor(labelText) {
        super();
        _ListElementWithRenameLabel_instances.add(this);
        _ListElementWithRenameLabel_lastLabelText.set(this, void 0);
        _ListElementWithRenameLabel_labelEl.set(this, document.createElement("label"));
        __classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f").innerText = labelText;
        this.append(__classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f"));
        this.listenEvents(new EventListener(this, Events.DB_CLICK, (event) => __classPrivateFieldGet(this, _ListElementWithRenameLabel_instances, "m", _ListElementWithRenameLabel_setLabelEditable).call(this, event)), new EventListener(__classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f"), Events.KEY_DOWN, (event) => __classPrivateFieldGet(this, _ListElementWithRenameLabel_instances, "m", _ListElementWithRenameLabel_onLabelKeydown).call(this, event)), new EventListener(__classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f"), Events.BLUR, (event) => __classPrivateFieldGet(this, _ListElementWithRenameLabel_instances, "m", _ListElementWithRenameLabel_onLabelFocusOut).call(this, event)));
    }
    get labelText() {
        return __classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f").innerText;
    }
}
_ListElementWithRenameLabel_lastLabelText = new WeakMap(), _ListElementWithRenameLabel_labelEl = new WeakMap(), _ListElementWithRenameLabel_instances = new WeakSet(), _ListElementWithRenameLabel_setLabelEditable = function _ListElementWithRenameLabel_setLabelEditable(event) {
    const label = __classPrivateFieldGet(this, _ListElementWithRenameLabel_labelEl, "f");
    __classPrivateFieldSet(this, _ListElementWithRenameLabel_lastLabelText, label.innerText, "f");
    label.setAttribute("contenteditable", true);
    label.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(label);
    selection.removeAllRanges();
    selection.addRange(range);
}, _ListElementWithRenameLabel_onLabelKeydown = function _ListElementWithRenameLabel_onLabelKeydown(event) {
    const label = event.currentTarget;
    switch (event.key) {
        case "Escape":
            label.innerText = __classPrivateFieldGet(this, _ListElementWithRenameLabel_lastLabelText, "f");
        case "Enter":
            if (!label.innerText)
                label.innerText = __classPrivateFieldGet(this, _ListElementWithRenameLabel_lastLabelText, "f");
            label.blur();
            break;
    }
}, _ListElementWithRenameLabel_onLabelFocusOut = function _ListElementWithRenameLabel_onLabelFocusOut(event) {
    const label = event.currentTarget;
    label.removeAttribute("contenteditable");
    if (this.labelText !== __classPrivateFieldGet(this, _ListElementWithRenameLabel_lastLabelText, "f")) {
        __classPrivateFieldGet(this, _ListElementWithRenameLabel_instances, "m", _ListElementWithRenameLabel_onLabelChanged).call(this);
    }
}, _ListElementWithRenameLabel_onLabelChanged = function _ListElementWithRenameLabel_onLabelChanged() {
    this.dispatchEvent(new Event(Events.LABEL_CHANGED, { bubbles: true }));
};
//# sourceMappingURL=ListElementWithRenameLabel.js.map