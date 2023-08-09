import {Button} from "../../../shared/components/button/Button.js";

export class PanelButton extends Button {
    constructor(iconPath:string) {
        super(undefined, iconPath);
        this.classList.add("panel-button");
    }
}

customElements.define("el-panel-button", PanelButton);