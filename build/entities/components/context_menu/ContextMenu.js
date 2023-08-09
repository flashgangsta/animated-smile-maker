import { ElementBase } from "../../../shared/ElementBase.js";
import { ContextMenuButton } from "../context_menu_button/ContextMenuButton.js";
import { EventListener } from "../../../shared/utils/EventListener.js";
export class ContextMenu extends ElementBase {
    constructor(contextData, closeCallback, listenClickOutside = true) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");
        Object.keys(contextData).forEach((el) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });
        this.listenEvents(new EventListener(window, "blur" /* Events.BLUR */, (event) => { var _a; return (_a = this.closeCallback) === null || _a === void 0 ? void 0 : _a.call(this); }));
        if (listenClickOutside) {
            this.listenEvents(new EventListener(window, "mousedown" /* Events.MOUSE_DOWN */, (event) => this.onWindowMouseDown(event)));
        }
    }
    onWindowMouseDown(event) {
        var _a;
        //todo: test it
        const target = event.target;
        if (!(target instanceof ContextMenuButton)) {
            (_a = this.closeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    }
}
customElements.define("el-context-menu", ContextMenu);
//# sourceMappingURL=ContextMenu.js.map