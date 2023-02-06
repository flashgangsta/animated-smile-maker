import {Panel} from "./Panel.js";

export class Library extends Panel {
	constructor() {
		super("Library");

		this.id = "library";
	}
}

customElements.define("library-el", Library);