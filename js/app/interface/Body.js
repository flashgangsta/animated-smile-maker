import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";

export class Body extends CustomElement {

	#canvas = document.createElement("canvas");
	#ctx = this.#canvas.getContext("2d");

	constructor() {
		super();
		this.id = "body";

		this.listenEvents(
			new EventListener(window, "resize", (event) => {this.#onWindowResize(event)}),
			new EventListener(this, "ADDED_TO_DOM", () => {this.#onWindowResize()})
		);

		this.append(this.#canvas);

	}


	#onWindowResize(event=null) {
		this.#canvas.width = this.offsetWidth;
		this.#canvas.height = this.offsetHeight;
	}
}

customElements.define("body-el", Body);