import {ContextMenu} from "../contextMenu/ContextMenu.js";

export class MenuContextMenu extends ContextMenu {

	#menuButton;

	constructor(menuButton, contextData, closeCallback) {
		super(contextData, closeCallback);
		this.#menuButton = menuButton;
		this.style.left = menuButton.offsetLeft + "px";
	}

	get menuButtonLabel() {
		return this.#menuButton.label;
	}

	remove() {
		this.#menuButton = null;
		super.remove()
	}
}


customElements.define("menu-context-menu-el", MenuContextMenu);