import { Button } from "../../../shared/components/button/Button.js";
export class ContextMenuButton extends Button {
    constructor(label, data) {
        super(label);
        if (data.handler) {
            /*this.listenEvents(
                new EventListener(this, Events.CLICK, () => data.handler()),
            )*/
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