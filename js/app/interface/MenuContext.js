import {CustomElement} from "./CustomElement.js";
import {MenuContextButton} from "./MenuContextButton.js";

export class MenuContext extends CustomElement {

	#button;

	constructor(button, contextData) {
		super();
		this.classList.add("menu-context");

		this.#button = button;

		Object.keys(contextData).forEach((el) => {
			console.log(el);
			this.append(new MenuContextButton(el));
		});

		this.style.left = button.offsetLeft + "px";
	}


	get buttonLabel() {
		return this.#button.label;
	}
}

customElements.define("menu-context-el", MenuContext);