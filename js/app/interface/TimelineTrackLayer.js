export class TimelineTrackLayer extends HTMLElement {
	constructor() {
		super();
		this.classList.add("timeline-track-layer")
	}
}

customElements.define("timeline-track-layer", TimelineTrackLayer);