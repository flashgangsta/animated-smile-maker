export class Body extends HTMLElement {

	#canvas = document.createElement("canvas");
	#ctx = this.#canvas.getContext("2d");

	constructor() {
		super();
		this.id = "body";
	}
}

customElements.define("body-el", Body);