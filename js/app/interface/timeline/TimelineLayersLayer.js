import {CustomElement} from "../CustomElement.js";
import {EventListener} from "../../models/EventListener.js";

export class TimelineLayersLayer extends CustomElement {

	#lastLabelName;

	constructor(index) {
		super();
		const labelEl = document.createElement("label");
		labelEl.innerText = `Layer ${index}`;
		this.append(labelEl);
		this.classList.add("timeline-layers-layer");

		this.setEventListeners(
			new EventListener(this, "click", (event) => this.select(event)),
			new EventListener(labelEl, "dblclick", (event) => this.#setLabelEditable(event)),
			new EventListener(labelEl, "keydown", (event) => this.#onLabelKeydown(event)),
			new EventListener(labelEl, "blur", (event) => this.#onLabelFocusOut(event)),
		);
	}


	#setLabelEditable(event) {
		const label = event.currentTarget;
		this.#lastLabelName = label.innerHTML;
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
				label.innerText = this.#lastLabelName;
			case "Enter":
				if(!label.innerHTML) label.innerText = this.#lastLabelName;
				label.blur();
				break;
		}
	}


	#onLabelFocusOut(event) {
		const label = event.currentTarget;
		label.removeAttribute("contenteditable");
	}


	select() {
		this.dispatchEvent(new Event("LAYER_SELECT", {bubbles: true}));
		this.classList.add("selected");
	}


	unselect() {
		this.classList.remove("selected");
	}

}

customElements.define("timeline-layers-layer", TimelineLayersLayer);