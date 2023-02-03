import {PanelButton} from "./PanelButton.js";
import {TimelineLayersLayer} from "./TimelineLayersLayer.js";
import {SubPanel} from "./SubPanel.js";

export class TimelineLayers extends SubPanel {

	#unnamedLayerNum = 0;

	constructor() {
		super();
		this.id = "timeline-layers";

		const buttonVisibility = new PanelButton("./assets/eye-ico.png");
		const buttonLock = new PanelButton("./assets/lock-ico.png");

		const buttonNewLayer = new PanelButton("./assets/new-layer-ico.png");
		const buttonRemoveLayer = new PanelButton("./assets/remove-layer-ico.png");

		this.#addLayer();

		buttonNewLayer.addEventListener("click", (event) => this.#addLayer());
		buttonRemoveLayer.addEventListener("click", (event) => this.#removeSelectedLayer());


		this.subPanelContainer.classList.add("layers-container");

		this.subPanelContainer.addEventListener("LAYER_SELECT", (event) => {
			event.stopPropagation();
			this.#getSelectedLayer()?.unselect();
		});

		this.header.append(buttonVisibility, buttonLock);
		this.footer.append(buttonNewLayer, buttonRemoveLayer);
	}


	#addLayer() {
		const layer = new TimelineLayersLayer(++this.#unnamedLayerNum);
		const lastSelectedLayer = this.#getSelectedLayer();
		if(lastSelectedLayer) {
			lastSelectedLayer.unselect();
			this.subPanelContainer.insertBefore(layer, lastSelectedLayer);
		} else {
			this.subPanelContainer.prepend(layer);
		}

		layer.select();

		this.dispatchEvent(new Event("LAYER_ADDED", {bubbles: true}))
	}


	#removeSelectedLayer() {
		const layersList = this.subPanelContainer.children;
		if(layersList.length > 1) {
			const selectedLayer = this.#getSelectedLayer();
			const selectedLayerIndex = Array.from(layersList).indexOf(selectedLayer);
			selectedLayer.remove();
			layersList[Math.min(selectedLayerIndex, layersList.length-1)].select();
		}
	}


	#getSelectedLayer() {
		return this.subPanelContainer.querySelector(".selected");
	}
}

customElements.define("timeline-layers-el", TimelineLayers);