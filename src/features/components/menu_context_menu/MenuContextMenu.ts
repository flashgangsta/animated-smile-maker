import {ContextMenu} from "../../../entities/components/context_menu/ContextMenu.js";
import {MenuButton} from "../menu_button/MenuButton.js";
import {IMenuContentDataItem} from "../../../shared/interfaces/IMenuContentData";

export class MenuContextMenu extends ContextMenu {

    private menuButton:MenuButton;
    constructor(menuButton:MenuButton, contextData:IMenuContentDataItem, closeCallback:Function) {
        super({ [menuButton.label]: contextData }, closeCallback);
        this.menuButton = menuButton;
        this.style.left = menuButton.offsetLeft + "px";
        console.log("MenuContextMenu")
    }


    get menuButtonLabel() {
        return this.menuButton.label;
    }

}

customElements.define("el-menu-context-menu", MenuContextMenu);