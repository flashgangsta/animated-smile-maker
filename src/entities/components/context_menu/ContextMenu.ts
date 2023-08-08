import {ElementBase} from "../../../shared/ElementBase.js";
import {ContextMenuButton} from "../context_menu_button/ContextMenuButton.js";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";
import {EventListener} from "../../../shared/utils/EventListener.js";
import {Events} from "../../../shared/lib/Events";

export class ContextMenu extends ElementBase {

    private closeCallback:Function | undefined;
    constructor(contextData:IMenuContextItem, closeCallback?:Function) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");

        Object.keys(contextData).forEach((el:string) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });

        this.listenEvents(
            new EventListener(window, Events.BLUR, (event) => this.closeCallback?.()),
        );
    }
}

customElements.define("el-context-menu", ContextMenu);