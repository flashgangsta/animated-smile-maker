import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";
import {Events} from "../Events.js";

export class ListElementWithRenameLabel extends CustomElement {

	#lastLabelText;
	#labelEl = document.createElement("label");


	constructor(labelText) {
		super();
		this.#labelEl.innerText = labelText;
		this.append(this.#labelEl);

		this.listenEvents(
			new EventListener(this, Events.DB_CLICK, (event) => this.#setLabelEditable(event)),
			new EventListener(this.#labelEl, Events.KEY_DOWN, (event) => this.#onLabelKeydown(event)),
			new EventListener(this.#labelEl, Events.BLUR, (event) => this.#onLabelFocusOut(event)),
		)
	}


	get labelText() {
		return this.#labelEl.innerText;
	}


	#setLabelEditable(event) {
		const label = this.#labelEl;
		this.#lastLabelText = label.innerText;
		label.setAttribute("contenteditable", true);
		label.focus();

		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(label);
		selection.removeAllRanges();
		selection.addRange(range);

	}


	#onLabelKeydown(event) {
		const label = event.currentTarget;

		switch (event.key) {
			case "Escape":
				label.innerText = this.#lastLabelText;
			case "Enter":
				if(!label.innerText) label.innerText = this.#lastLabelText;
				label.blur();
				break;
		}
	}


	#onLabelFocusOut(event) {
		const label = event.currentTarget;
		label.removeAttribute("contenteditable");
		if(this.labelText !== this.#lastLabelText) {
			this.#onLabelChanged();
		}
	}


	#onLabelChanged() {
		this.dispatchEvent(new Event(Events.LABEL_CHANGED, {bubbles: true}));
	}
}