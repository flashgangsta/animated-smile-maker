import {Button} from "../../../shared/components/button/Button.js";

export class PanelTabButton extends Button {
    constructor(label:string) {
        super(label);
        this.classList.add("panel-tab-button");
    }
}

customElements.define("el-panel-tab-button", PanelTabButton);