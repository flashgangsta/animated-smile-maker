import {PanelHeader} from "./PanelHeader.js";
import {CustomElement} from "../CustomElement.js";
import {Container} from "../Container.js";

export class Panel extends CustomElement {

	#panelsContainer = new Container();
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