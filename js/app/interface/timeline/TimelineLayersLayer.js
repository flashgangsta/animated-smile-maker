import {EventListener} from "../../models/EventListener.js";
import {ListElementWithRenameLabel} from "../ListElementWithRenameLabel.js";
import {ProjectConfig} from "../../ProjectConfig.js";

export class TimelineLayersLayer extends ListElementWithRenameLabel {

	#id;
	#projectConfig = new ProjectConfig();

	constructor(index, name = null) {
		super(name || `Layer ${index}`);

		this.#id = index;

		this.classList.add("timeline-layers-layer");

		this.listenEvents(
			new EventListener(this, "click", (event) => this.select(event)),
		);

		this.#projectConfig.pushLibraryLayer(this);
	}


	select() {
		this.dispatchEvent(new Event("LAYER_SELECT", {bubbles: true}));
		this.classList.add("selected");
	}


	unselect() {
		this.classList.remove("selected");
	}


	get id() {
		return this.#id;
	}


	serializeObject() {
		return {
			id: this.id,
			label: this.labelText,
		}
	}


	remove() {
		this.#projectConfig.removeLibraryLayer(this);
		super.remove();
	}

}

customElements.define("timeline-layers-layer", TimelineLayersLayer);