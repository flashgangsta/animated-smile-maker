export class PanelTabButton extends HTMLElement {
	#title = document.createElement("label");
	constructor(label) {
		super();
		this.classList.add("panel-tab-button");
		this.#title.innerText = label;
		this.append(this.#title);
	}
}

customElements.define("panel-tab-button", PanelTabButton);