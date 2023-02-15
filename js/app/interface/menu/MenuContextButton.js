import {Button} from "../Button.js";
import {EventListener} from "../../models/EventListener.js";

export class MenuContextButton extends Button {
	constructor(label, data) {
		super(label);

		if(data.handler) {
			this.addEventListeners(
				new EventListener(this, "click", () => data.handler()),
			)
		} else {
			this.disabled = true;
		}

		if(data.disabled) {
			this.disabled = true;
		}
	}
}

customElements.define("menu-context-button-el", MenuContextButton);