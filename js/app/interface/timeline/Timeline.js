import {TimelineLayers} from "./TimelineLayers.js";
import {TimelineTrack} from "./TimelineTrack.js";
import {Panel} from "../panels/Panel.js";


export class Timeline extends Panel {
	constructor() {
		super("Timeline");
		this.id = "timeline";
		const timelineLayers = new TimelineLayers();
		const timelineTrack = new TimelineTrack();

		this.panelsContainer.append(timelineLayers, timelineTrack);

		timelineLayers.addEventListener("LAYER_ADDED", (event) => {
			timelineTrack.addLayer();
		});

		timelineLayers.addEventListener("LAYER_REMOVED", (event) => {
			timelineTrack.removeLayer();
		});

		const subPanelContainers = this.querySelectorAll(".sub-panel-container");

		subPanelContainers.forEach((el) => {
			el.addEventListener("mousewheel", (event) => {
				const target = el.scrollTop - (event.wheelDelta / 4);
				subPanelContainers.forEach((el) => {
					el.scroll({top: 0, left: target, behavior: "smooth"});
				});
			}, {passive: true});
		})
	}
}

customElements.define("timeline-el", Timeline);