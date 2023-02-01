import {TimelineLayers} from "./TimelineLayers.js";
import {Panel} from "./Panel.js";

export class Timeline extends Panel {
	constructor() {
		super("Timeline");
		this.id = "timeline";
		const timelineLayers = new TimelineLayers();
		this.append(timelineLayers);
	}
}

customElements.define("timeline-el", Timeline);