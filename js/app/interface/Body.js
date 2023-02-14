import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";

export class Body extends CustomElement {

	#canvas = document.createElement("canvas");
	#ctx = this.#canvas.getContext("2d");

	constructor() {
		super();
		this.id = "body";
		this.append(this.#canvas);

		this.addEventListeners(
			new EventListener(window, "resize", (event) => {this.#onWindowResize(event)}),
		);

	}


	#onWindowResize(event) {
		this.#canvas.width = this.offsetWidth;
		this.#canvas.height = this.offsetHeight;
	}
}

customElements.define("body-el", Body);