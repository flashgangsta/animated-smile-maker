import { SubPanel } from "../../features/components/sub_panel/SubPanel.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { TimelineTrackLayer } from "./TimelineTrackLayer.js";
export class TimelineTrack extends SubPanel {
    constructor() {
        super();
        this.id = "timeline-track";
        this.addLayer();
        this.listenEvents(new EventListener(this, "TIMELINE_CONTEXT_CALL" /* Events.TIMELINE_CONTEXT_CALL */, (event) => { this.onContextCall(event); }));
    }
    addLayer() {
        const layer = new TimelineTrackLayer();
        this.subPanelContainer.append(layer);
    }
    removeLayer() {
        this.subPanelContainer.children[0].remove();
    }
    onContextCall(event) {
        const timelineTrackLayer = event.target;
        const contextMenu = timelineTrackLayer.contextMenu;
        if (contextMenu) {
            contextMenu.setOffset(timelineTrackLayer.offsetLeft, timelineTrackLayer.offsetTop);
            this.append(contextMenu);
        }
    }
}
customElements.define("el-timeline-track", TimelineTrack);
//# sourceMappingURL=TimelineTrack.js.map