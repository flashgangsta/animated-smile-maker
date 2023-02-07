import {Button} from "./Button.js";


export class MenuButton extends Button {
	constructor(label) {
		super(label);
		this.classList.add("menu-button");
	}
}

customElements.define("menu-button-el", MenuButton);