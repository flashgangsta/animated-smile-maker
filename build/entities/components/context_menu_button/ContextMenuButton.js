import { Button } from "../../../shared/components/button/Button.js";
import { EventListener } from "../../../shared/utils/EventListener.js";
export class ContextMenuButton extends Button {
    constructor(label, data) {
        super(label);
        if (data.handler) {
            this.listenEvents(new EventListener(this, "click" /* Events.CLICK */, () => { var _a; return (_a = data.handler) === null || _a === void 0 ? void 0 : _a.call(data); }));
        }
        else {
            this.disabled = true;
        }
        if (data.disabled) {
            this.disabled = true;
        }
    }
}
customElements.define("el-menu-context-button", ContextMenuButton);
//# sourceMappingURL=ContextMenuButton.js.map