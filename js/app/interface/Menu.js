import {CustomElement} from "./CustomElement.js";
import {MenuButton} from "./MenuButton.js";

export class Menu extends CustomElement {

	#menuContent = {
		"File": {
			"New...": {},
			"Open": {},
			"Save": {},
			"Save As": {},
			"Import": {},
			"Export": {},
			"Settings": {},
			"Exit": {}
		},
		"Edit": {},
		"View": {}
	}

	constructor() {
		super();
		this.id = "menu";

		Object.keys(this.#menuContent).forEach((label) => {
			this.append(new MenuButton(label));
		});

		this.addEventListener("click", (event) => this.#onClick(event));
	}


	#onClick(event) {
		const target = event.target;
		if(target) {
			const label = target.label;
			const contextData = this.#menuContent[label];
		}
	}
}

customElements.define("menu-el", Menu)