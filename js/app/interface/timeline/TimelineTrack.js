import {TimelineTrackLayer} from "./TimelineTrackLayer.js";
import {SubPanel} from "../panels/SubPanel.js";
import {Events} from "../../Events.js";


export class TimelineTrack extends SubPanel {
	constructor() {
		super();

		this.id = "timeline-track";

		this.addLayer();

		this.addEventListener(Events.TIMELINE_CONTEXT_CALL, (event) => {
			const timelineTrackLayer = event.target;
			const contextMenu = timelineTrackLayer.contextMenu;
			contextMenu.setOffset(timelineTrackLayer.offsetLeft, timelineTrackLayer.offsetTop);
			this.append(contextMenu);
		});
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