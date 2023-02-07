import {Button} from "./Button.js";

export class MenuContextButton extends Button {
	constructor(label) {
		super(label);
	}
}

customElements.define("menu-context-button-el", MenuContextButton);