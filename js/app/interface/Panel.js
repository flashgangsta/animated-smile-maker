import {PanelTabButton} from "./PanelTabButton.js";
import {PanelHeader} from "./PanelHeader.js";

export class Panel extends HTMLElement {

	#panelHeader;
	constructor(...tabNames) {
		super();
		this.classList.add("panel");
		this.#panelHeader = new PanelHeader(tabNames);
		this.append(this.#panelHeader);
	}

}