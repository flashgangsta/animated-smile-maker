import {Button} from "../Button.js";

export class PanelTabButton extends Button {
	constructor(label) {
		super(label);
		this.classList.add("panel-tab-button");
	}
}

customElements.define("panel-tab-button", PanelTabButton);