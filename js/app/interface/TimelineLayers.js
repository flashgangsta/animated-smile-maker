import {PanelHeader} from "./PanelHeader.js";
import {PanelButton} from "./PanelButton.js";

export class TimelineLayers extends HTMLElement {
	constructor() {
		super();
		this.id = "timeline-layers";

		const header = document.createElement("div");
		const layersContainer = document.createElement("div");
		const footer = document.createElement("div");

		const buttonVisibility = new PanelButton("./assets/eye-ico.png");
		const buttonLock = new PanelButton("./assets/lock-ico.png");

		const buttonNewLayer = new PanelButton("./assets/new-layer-ico.png");
		const buttonRemoveLayer = new PanelButton("./assets/remove-layer-ico.png");

		header.classList.add("header");
		footer.classList.add("footer");
		layersContainer.classList.add("layers-container");

		header.append(buttonVisibility, buttonLock);
		footer.append(buttonNewLayer, buttonRemoveLayer);


		this.append(header, layersContainer, footer);
	}
}

customElements.define("timeline-layers-el", TimelineLayers);