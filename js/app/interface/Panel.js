import {PanelHeader} from "./PanelHeader.js";

export class Panel extends HTMLElement {

	#panelsContainer = document.createElement("div");
	#panelHeader;


	constructor(...tabNames) {
		super();
		this.#panelsContainer.classList.add("panels-container");
		this.classList.add("panel");
		this.#panelHeader = new PanelHeader(tabNames);
		this.append(this.#panelHeader, this.#panelsContainer);
	}


	get panelsContainer() {
		return this.#panelsContainer;
	}

}