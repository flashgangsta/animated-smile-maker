import {Button} from "../Button.js";

export class PanelButton extends Button {


	constructor(iconPath) {
		super(null, iconPath);
		this.classList.add("panel-button");
	}
}

customElements.define("panel-button", PanelButton);