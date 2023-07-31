import {Button} from "../../../shared/components/button/Button";
import {Events} from "../../../shared/lib/Events";
import {IMenuContextItemProps} from "../../../shared/interfaces/IMenuContentData";

export class ContextMenuButton extends Button {
    constructor(label: string, data:IMenuContextItemProps) {
        super(label);

        if(data.handler) {
            /*this.listenEvents(
                new EventListener(this, Events.CLICK, () => data.handler()),
            )*/
        } else {
            this.disabled = true;
        }

        if(data.disabled) {
            this.disabled = true;
        }
    }
}

customElements.define("el-menu-context-button", ContextMenuButton);