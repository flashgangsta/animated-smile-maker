import {MenuContextButton} from "./MenuContextButton.js";
import {CustomElement} from "../CustomElement.js";

export class MenuContext extends CustomElement {

	#button;

	constructor(button, contextData) {
		super();
		this.classList.add("menu-context");

		this.#button = button;

		Object.keys(contextData).forEach((el) => {
			this.append(new MenuContextButton(el, contextData[el]));
		});

		this.style.left = button.offsetLeft + "px";
	}


	get buttonLabel() {
		return this.#button.label;
	}


	remove() {
		this.#button = null;
		super.remove();
	}
}

customElements.define("menu-context-el", MenuContext);