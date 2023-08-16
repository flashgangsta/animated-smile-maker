import { SubPanel } from "../../features/components/sub_panel/SubPanel.js";
import { TimelineTrackLayer } from "./TimelineTrackLayer.js";
export class TimelineTrack extends SubPanel {
    constructor() {
        super();
        this.id = "timeline-track";
        this.addLayer();
    }
    addLayer() {
        const layer = new TimelineTrackLayer();
        this.subPanelContainer.append(layer);
    }
    removeLayer() {
        this.subPanelContainer.children[0].remove();
    }
}
customElements.define("el-timeline-track", TimelineTrack);
//# sourceMappingURL=TimelineTrack.js.map