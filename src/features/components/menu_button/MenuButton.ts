import {Button} from "../../../shared/components/button/Button.js";

export class MenuButton extends Button {
    constructor(label:string) {
        super(label);
        this.classList.add("menu-button");
    }
}

customElements.define("el-menu-button", MenuButton);