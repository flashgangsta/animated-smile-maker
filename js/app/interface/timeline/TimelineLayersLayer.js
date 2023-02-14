import {EventListener} from "../../models/EventListener.js";
import {ListElementWithRenameLabel} from "../ListElementWithRenameLabel.js";

export class TimelineLayersLayer extends ListElementWithRenameLabel {

	constructor(index) {
		super(`Layer ${index}`);

		this.classList.add("timeline-layers-layer");

		this.addEventListeners(
			new EventListener(this, "click", (event) => this.select(event)),
		);
	}


	select() {
		this.dispatchEvent(new Event("LAYER_SELECT", {bubbles: true}));
		this.classList.add("selected");
	}


	unselect() {
		this.classList.remove("selected");
	}

}

customElements.define("timeline-layers-layer", TimelineLayersLayer);