import { TimelineLayers } from "./TimelineLayers.js";
import { TimelineTrack } from "./TimelineTrack.js";
import { Panel } from "../panels/Panel.js";
import { Events } from "../../Events.js";
export class Timeline extends Panel {
    constructor() {
        super("Timeline");
        this.id = "timeline";
        const timelineLayers = new TimelineLayers();
        const timelineTrack = new TimelineTrack();
        this.panelsContainer.append(timelineLayers, timelineTrack);
        timelineLayers.addEventListener(Events.LAYER_ADDED, (event) => {
            timelineTrack.addLayer();
        });
        timelineLayers.addEventListener(Events.LAYER_REMOVED, (event) => {
            timelineTrack.removeLayer();
        });
        const subPanelContainers = this.querySelectorAll(".sub-panel-container");
        subPanelContainers.forEach((el) => {
            el.addEventListener(Events.MOUSE_WHEEL, (event) => {
                const target = el.scrollTop - (event.wheelDelta / 4);
                subPanelContainers.forEach((el) => {
                    el.scroll({ left: 0, top: target });
                });
            }, { passive: true });
        });
    }
}
customElements.define("timeline-el", Timeline);
//# sourceMappingURL=Timeline.js.map