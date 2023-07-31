import {ElementBase} from "../../../shared/ElementBase";
import {ContextMenuButton} from "../context_menu_button/ContextMenuButton";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";

export class ContextMenu extends ElementBase {

    private closeCallback:Function | undefined;
    constructor(contextData:IMenuContextItem, closeCallback?:Function) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");

        Object.keys(contextData).forEach((el:string) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });
    }
}

customElements.define("el-context-menu", ContextMenu);