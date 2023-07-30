import {Button} from "../../../shared/components/button/Button.js";
import {Events} from "../../../shared/lib/Events";

export class ContextMenuButton extends Button {
    constructor(label: string, data: {handler?:()=> void; disabled?:boolean}) {
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