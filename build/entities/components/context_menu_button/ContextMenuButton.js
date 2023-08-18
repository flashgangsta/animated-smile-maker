import { Button } from "../../../shared/components/button/Button.js";
import { EventListener } from "../../../shared/utils/EventListener.js";
export class ContextMenuButton extends Button {
    constructor(label, data) {
        super(label);
        if (data.handler && !data.disabled) {
            this.listenEvents(new EventListener(this, "click" /* Events.CLICK */, () => data.handler?.()));
        }
        else {
            this.disabled = true;
        }
    }
}
customElements.define("el-menu-context-button", ContextMenuButton);
//# sourceMappingURL=ContextMenuButton.js.map