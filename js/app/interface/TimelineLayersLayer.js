export class TimelineLayersLayer extends HTMLElement {

	#handlers = [];
	#lastLabelName;

	constructor(index) {
		super();
		const labelEl = document.createElement("label");
		labelEl.innerText = `Layer ${index}`;
		this.append(labelEl);
		this.classList.add("timeline-layers-layer");

		this.#handlers.push(
			{el: this, type: "click", handler: () => this.select()},
			{el: labelEl, type: "dblclick", handler: (event) => this.#setLabelEditable(event)},
			{el: labelEl, type: "keydown", handler: (event) => this.#onLabelKeydown(event)},
			{el: labelEl, type: "blur", handler: (event) => this.#onLabelFocusOut(event)}
		);

		this.#handlers.forEach((event) => {
			event.el.addEventListener(event.type, event.handler);
		});

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

	remove() {
		this.#handlers.forEach((event) => {
			event.el.removeEventListener(event.type, event.handler);
		});
		super.remove();
	}
}

customElements.define("timeline-layers-layer", TimelineLayersLayer);