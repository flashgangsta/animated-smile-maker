import {TimelineKeyFrame} from "./TimelineKeyFrame.js";

export class TimelineTrackLayer extends HTMLElement {
	constructor() {
		super();
		this.classList.add("timeline-track-layer");
		this.append(new TimelineKeyFrame());
	}
}

customElements.define("timeline-track-layer", TimelineTrackLayer);