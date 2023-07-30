import {CustomElement} from "./CustomElement.js";

export class Container extends CustomElement {
	constructor() {
		super();
		this.classList.add("container");
	}
}


customElements.define("container-el", Container);