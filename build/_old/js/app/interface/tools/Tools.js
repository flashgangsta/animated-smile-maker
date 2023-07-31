var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tools_instances, _Tools_onToolSelect, _Tools_getSelectedTool;
import { CustomElement } from "../CustomElement.js";
import { ToolButton } from "./ToolButton.js";
import { Events } from "../../Events.js";
export class Tools extends CustomElement {
    static get TOOL_MOVE() { return "move"; }
    ;
    static get TOOL_HAND() { return "hand"; }
    ;
    constructor() {
        super();
        _Tools_instances.add(this);
        this.id = "tools";
        const buttonMove = new ToolButton("./assets/move-ico.png", Tools.TOOL_MOVE);
        const buttonHand = new ToolButton("./assets/hand-ico.png", Tools.TOOL_HAND);
        this.append(buttonMove, buttonHand);
        Array.from(this.children).forEach((button) => {
            button.addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_onToolSelect).call(this, event));
        });
    }
    get selectedToolName() {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_getSelectedTool).call(this)) === null || _a === void 0 ? void 0 : _a.toolName) || null;
    }
}
_Tools_instances = new WeakSet(), _Tools_onToolSelect = function _Tools_onToolSelect(event) {
    var _a;
    const button = event.target;
    (_a = __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_getSelectedTool).call(this)) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
    button.classList.add("active");
    this.dispatchEvent(new Event(Events.TOOL_SELECT));
}, _Tools_getSelectedTool = function _Tools_getSelectedTool() {
    return this.querySelector(".active");
};
customElements.define("tools-el", Tools);
//# sourceMappingURL=Tools.js.map