import { ContextMenu } from "../../../entities/components/context_menu/ContextMenu.js";
export class MenuContextMenu extends ContextMenu {
    constructor(menuButton, contextData, closeCallback) {
        super({ [menuButton.label]: contextData }, closeCallback);
        this.menuButton = menuButton;
        this.style.left = menuButton.offsetLeft + "px";
        console.log("MenuContextMenu");
    }
    get menuButtonLabel() {
        return this.menuButton.label;
    }
}
customElements.define("el-menu-context-menu", MenuContextMenu);
//# sourceMappingURL=MenuContextMenu.js.map