import { ElementBase } from "../../../shared/ElementBase";
import { ContextMenuButton } from "../context_menu_button/ContextMenuButton";
export class ContextMenu extends ElementBase {
    constructor(contextData, closeCallback) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");
        Object.keys(contextData).forEach((el) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });
    }
}
customElements.define("el-context-menu", ContextMenu);
//# sourceMappingURL=ContextMenu.js.map