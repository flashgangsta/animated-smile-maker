import {CustomElement} from "./CustomElement.js";

export class Tools extends CustomElement {
	constructor() {
		super();
		this.id = "tools";
	}
}

customElements.define("tools-el", Tools);