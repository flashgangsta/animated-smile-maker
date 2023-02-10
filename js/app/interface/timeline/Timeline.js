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
				const delta = event.wheelDelta;
				const target = el.scrollTop - (delta / 4);
				subPanelContainers.forEach((el) => {
					el.scroll(0, target, "smooth");
				});
			})
		})
	}
}

customElements.define("timeline-el", Timeline);