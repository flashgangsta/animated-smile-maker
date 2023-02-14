import {TimelineLayersLayer} from "./TimelineLayersLayer.js";
import {SubPanel} from "../panels/SubPanel.js";
import {PanelButton} from "../panels/PanelButton.js";
import {PanelButtonRemove} from "../panels/PanelButtonRemove.js";
import {ProjectConfig} from "../../ProjectConfig.js";

export class TimelineLayers extends SubPanel {

	#projectConfig = new ProjectConfig();
	#unnamedLayerNum = this.#projectConfig.layersLength;

	constructor() {
		super();
		this.id = "timeline-layers";

		const buttonVisibility = new PanelButton("./assets/eye-ico.png");
		const buttonLock = new PanelButton("./assets/lock-ico.png");

		const buttonNewLayer = new PanelButton("./assets/new-layer-ico.png");
		const buttonRemoveLayer = new PanelButtonRemove();

		this.#addLayer();

		buttonNewLayer.addEventListener("click", (event) => this.#addLayer());
		buttonRemoveLayer.addEventListener("click", (event) => this.#removeSelectedLayer());
		this.#projectConfig.addEventListener("PROJECT_OPEN", (event) => this.#onProjectOpen());
		this.#projectConfig.addEventListener("PROJECT_LAYERS_INIT", (event) => this.#loadProjectLayers());

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

		this.#dispatchLayerAdded();
	}


	#removeSelectedLayer() {
		//TODO: Move this and same in LibraryItemsList to extends class
		const layersList = this.subPanelContainer.children;
		if(layersList.length > 1) {
			const selectedLayer = this.#getSelectedLayer();
			const selectedLayerIndex = Array.from(layersList).indexOf(selectedLayer);
			selectedLayer.remove();
			layersList[Math.min(selectedLayerIndex, layersList.length-1)].select();
			this.dispatchEvent(new Event("LAYER_REMOVED", {bubbles: true}));
		}
	}


	#removeAllLayers() {
		const layersList = Array.from(this.subPanelContainer.children);
		layersList.forEach((layer) => {
			layer.remove();
			this.dispatchEvent(new Event("LAYER_REMOVED", {bubbles: true}));
		})
	}


	#getSelectedLayer() {
		return this.subPanelContainer.querySelector(".selected");
	}


	#onProjectOpen() {
		this.#removeAllLayers();
	}


	#loadProjectLayers() {
		const layersList = this.#projectConfig.libraryLayers;
		layersList.forEach((layer) => {
			this.subPanelContainer.prepend(layer);
			this.#dispatchLayerAdded();
		})

		layersList[layersList.length - 1].select();

	}


	#dispatchLayerAdded() {
		this.dispatchEvent(new Event("LAYER_ADDED", {bubbles: true}));
	}

}

customElements.define("timeline-layers-el", TimelineLayers);