import {Button} from "../Button.js";
import {EventListener} from "../../models/EventListener.js";
import {Events} from "../../Events.js";

export class ContextMenuButton extends Button {
	constructor(label, data) {
		super(label);

		if(data.handler) {
			this.listenEvents(
				new EventListener(this, Events.CLICK, () => data.handler()),
			)
		} else {
			this.disabled = true;
		}

		if(data.disabled) {
			this.disabled = true;
		}
	}
}

customElements.define("menu-context-button-el", ContextMenuButton);