import {TimelineTrackLayer} from "./TimelineTrackLayer.js";
import {SubPanel} from "../panels/SubPanel.js";


export class TimelineTrack extends SubPanel {
	constructor() {
		super();

		this.id = "timeline-track";

		this.addLayer();
	}


	addLayer() {
		const layer = new TimelineTrackLayer();
		this.subPanelContainer.append(layer);
	}


	removeLayer() {
		this.subPanelContainer.children[0].remove();
	}
}

customElements.define("timeline-track", TimelineTrack);