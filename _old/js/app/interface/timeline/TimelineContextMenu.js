import {ContextMenu} from "../contextMenu/ContextMenu.js";
import {EventListener} from "../../models/EventListener.js";
import {Events} from "../../Events.js";

export class TimelineContextMenu extends ContextMenu {

	#topMargin = -20;
	#frameX = 0;
	#x = 0;
	#y = 0;

	constructor(x, menuContent, closeCallback) {
		super(menuContent, closeCallback);
		this.#frameX = x;
		this.listenEvents(
			new EventListener(this, Events.ADDED_TO_DOM, (event) => this.#addedToDOM(event))
		);
	}


	setOffset(x, y) {
		this.#x = x + this.#frameX;
		this.#y = y + this.#topMargin;
		this.style.top = `${this.#y}px`;
		this.style.left = `${this.#x}px`;

	}


	#addedToDOM(event) {
		const rect = this.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		if(rect.right > windowWidth) {
			this.style.left = `${Math.round(this.#x - rect.width)}px`;
		}

		if(rect.bottom > windowHeight) {
			this.style.top = `${this.#y - (rect.bottom - windowHeight) + this.#topMargin}px`;
		}
	}
}

customElements.define("timeline-context-menu", TimelineContextMenu);