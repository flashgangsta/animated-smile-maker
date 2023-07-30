import {ElementBase} from "../../../shared/ElementBase.js";
import {ContextMenuButton} from "../context_menu_button/ContextMenuButton.js";
import {IMenuContentDataItem} from "../../../shared/interfaces/IMenuContentData";

export class ContextMenu extends ElementBase {

    private closeCallback:Function | undefined;
    constructor(contextData: { [key: string]: IMenuContentDataItem }, closeCallback?:Function) {
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