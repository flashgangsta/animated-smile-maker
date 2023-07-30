import {ContextMenuButton} from "./ContextMenuButton.js";
import {CustomElement} from "../CustomElement.js";
import {EventListener} from "../../models/EventListener.js";
import {Events} from "../../Events.js";

export class ContextMenu extends CustomElement {

	#closeCallback;

	constructor(contextData, closeCallback = null) {
		super();

		this.#closeCallback = closeCallback;
		this.classList.add("context-menu");

		Object.keys(contextData).forEach((el) => {
			this.append(new ContextMenuButton(el, contextData[el]));
		});

		this.listenEvents(
			new EventListener(window, Events.BLUR, (event) => this.#onWindowBlur(event)),
		);
	}


	#onWindowBlur(event) {
		this.#closeCallback && this.#closeCallback();
	}


	remove() {
		super.remove();
	}
}

customElements.define("context-menu-el", ContextMenu);