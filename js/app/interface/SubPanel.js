export class SubPanel extends HTMLElement {

	#header = document.createElement("div");
	#footer = document.createElement("div");
	#subPanelContainer = document.createElement("div");
	constructor() {
		super();

		this.classList.add("sub-panel");
		this.#header.classList.add("header");
		this.#footer.classList.add("footer");
		this.#subPanelContainer.classList.add("sub-panel-container");

		this.append(this.header, this.subPanelContainer, this.footer);
	}


	get header() {
		return this.#header;
	}


	get footer() {
		return this.#footer;
	}


	get subPanelContainer() {
		return this.#subPanelContainer;
	}
}