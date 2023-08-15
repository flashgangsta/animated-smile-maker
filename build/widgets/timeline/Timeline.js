import { Panel } from "../../features/components/panel/Panel.js";
import { TimelineLayers } from "./TimelineLayers.js";
import { TimelineTrack } from "./TimelineTrack.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { getCSSVar } from "../../shared/utils/getCSSVar.js";
export class Timeline extends Panel {
    constructor() {
        super("Timeline");
        this.layerHeight = parseInt(getCSSVar("timeline-layers-height"));
        this.layersScrollHeight = this.layerHeight * 2;
        this.id = "timeline";
        this.timelineLayers = new TimelineLayers();
        this.timelineTrack = new TimelineTrack();
        this.init();
    }
    init() {
        this.panelsContainer.append(this.timelineLayers, this.timelineTrack);
        this.listenEvents(new EventListener(this.timelineLayers, "LAYER_ADDED" /* Events.LAYER_ADDED */, (event) => { this.timelineTrack.addLayer(); }), new EventListener(this.timelineLayers, "LAYER_REMOVED" /* Events.LAYER_REMOVED */, (event) => { this.timelineTrack.removeLayer(); }), new EventListener(this.panelsContainer, "wheel" /* Events.WHEEL */, (event) => { this.onWheel(event); }, { passive: true }));
    }
    onWheel(event) {
        const delta = event.deltaY < 0 ? -this.layersScrollHeight : this.layersScrollHeight;
        this.timelineLayers.subPanelContainer.scrollTop += delta;
        this.timelineTrack.subPanelContainer.scrollTop += delta;
    }
}
customElements.define("el-timeline", Timeline);
//# sourceMappingURL=Timeline.js.map