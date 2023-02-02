import {PanelButton} from "./PanelButton.js";
import {TimelineLayersLayer} from "./TimelineLayersLayer.js";

export class TimelineLayers extends HTMLElement {

	#layersContainer = document.createElement("div");
	#unnamedLayerNum = 0;

	constructor() {
		super();
		this.id = "timeline-layers";

		const header = document.createElement("div");
		const layersContainer = this.#layersContainer = document.createElement("div");
		const footer = document.createElement("div");

		const buttonVisibility = new PanelButton("./assets/eye-ico.png");
		const buttonLock = new PanelButton("./assets/lock-ico.png");

		const buttonNewLayer = new PanelButton("./assets/new-layer-ico.png");
		const buttonRemoveLayer = new PanelButton("./assets/remove-layer-ico.png");

		this.#addLayer();

		buttonNewLayer.addEventListener("click", (event) => this.#addLayer());
		buttonRemoveLayer.addEventListener("click", (event) => this.#removeSelectedLayer());

		header.classList.add("header");
		footer.classList.add("footer");
		layersContainer.classList.add("layers-container");

		layersContainer.addEventListener("LAYER_SELECT", (event) => {
			event.stopPropagation();
			this.#getSelectedLayer()?.unselect();
		});

		header.append(buttonVisibility, buttonLock);
		footer.append(buttonNewLayer, buttonRemoveLayer);

		this.append(header, layersContainer, footer);
	}


	#addLayer() {
		const layer = new TimelineLayersLayer(++this.#unnamedLayerNum);
		const lastSelectedLayer = this.#getSelectedLayer();
		if(lastSelectedLayer) {
			lastSelectedLayer.unselect();
			this.#layersContainer.insertBefore(layer, lastSelectedLayer);
		} else {
			this.#layersContainer.prepend(layer);
		}

		layer.select();
	}


	#removeSelectedLayer() {
		const layersList = this.#layersContainer.children;
		if(layersList.length > 1) {
			this.#getSelectedLayer().remove();
			layersList[0].select();
		}
	}


	#getSelectedLayer() {
		return this.#layersContainer.querySelector(".selected");
	}
}

customElements.define("timeline-layers-el", TimelineLayers);