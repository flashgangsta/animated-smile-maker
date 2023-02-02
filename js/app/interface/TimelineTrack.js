import {SubPanel} from "./SubPanel.js";

export class TimelineTrack extends SubPanel {
	constructor() {
		super();

		this.id = "timeline-track";
	}
}

customElements.define("timeline-track", TimelineTrack);