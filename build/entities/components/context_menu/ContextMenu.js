import { ElementBase } from "../../../shared/ElementBase.js";
import { ContextMenuButton } from "../context_menu_button/ContextMenuButton.js";
export class ContextMenu extends ElementBase {
    constructor(contextData, closeCallback) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");
        console.log("contextData:", contextData);
        Object.keys(contextData).forEach((el) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });
    }
}
customElements.define("el-context-menu", ContextMenu);
//# sourceMappingURL=ContextMenu.js.map