import {ContextMenu} from "../../../entities/components/context_menu/ContextMenu";
import {MenuButton} from "../menu_button/MenuButton";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";

export class MenuContextMenu extends ContextMenu {

    private menuButton:MenuButton;
    constructor(menuButton:MenuButton, contextData:IMenuContextItem, closeCallback:Function) {
        super(contextData, closeCallback);
        this.menuButton = menuButton;
        this.style.left = menuButton.offsetLeft + "px";
    }


    get menuButtonLabel() {
        return this.menuButton.label;
    }

}

customElements.define("el-menu-context-menu", MenuContextMenu);