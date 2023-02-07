import {CustomElement} from "./CustomElement.js";

export class Button extends CustomElement {

	#disabled = false;
	#label;
	#icon;

	constructor(label = null, iconPath = null) {
		super();
		this.classList.add("button");

		if(label) {
			this.#label = document.createElement("label");
			this.#label.innerText = label;
			this.append(this.#label);
		}

		if(iconPath) {
			this.#icon = new Image();
			this.#icon.src = iconPath;
			this.append(this.#icon);
		}
	}

	get disabled() {
		return this.#disabled;
	}

	set disabled(value) {
		this.#disabled = !!value;
		if(this.#disabled) {
			this.setAttribute("disabled", "true");
		} else {
			this.removeAttribute("disabled");
		}
	}


	get label() {
		return this.#label.innerText;
	}
}