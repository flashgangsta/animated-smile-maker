import {Button} from "../../../shared/components/button/Button.js";
import {Events} from "../../../shared/lib/Events";
import {IMenuContextItemProps} from "../../../shared/interfaces/IMenuContentData";
import {EventListener} from "../../../shared/utils/EventListener.js";

export class ContextMenuButton extends Button {
    constructor(label: string, data:IMenuContextItemProps) {
        super(label);

        if(data.handler && !data.disabled) {
            this.listenEvents(
                new EventListener(this, Events.CLICK, () => data.handler?.()),
            );
        } else {
            this.disabled = true;
        }
    }
}

customElements.define("el-menu-context-button", ContextMenuButton);