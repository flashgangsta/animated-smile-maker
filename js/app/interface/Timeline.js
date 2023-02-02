import {TimelineLayers} from "./TimelineLayers.js";
import {Panel} from "./Panel.js";
import {TimelineTrack} from "./TimelineTrack.js";

export class Timeline extends Panel {
	constructor() {
		super("Timeline");
		this.id = "timeline";
		const panelsContainer = document.createElement("div");
		const timelineLayers = new TimelineLayers();
		const timelineTrack = new TimelineTrack();

		panelsContainer.classList.add("panels-container");
		panelsContainer.append(timelineLayers, timelineTrack);
		this.append(panelsContainer);
	}
}

customElements.define("timeline-el", Timeline);