export class TimelineTrackLayer extends HTMLElement {
	constructor() {
		super();

		this.classList.add("timeline-track-layer")

		this.addLayer();
	}


	addLayer() {
		console.log("track catch");
	}
}

customElements.define("timeline-track-layer", TimelineTrackLayer);