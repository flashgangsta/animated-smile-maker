import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {TimelineTrackLayer} from "./TimelineTrackLayer.js";

export class TimelineTrack extends SubPanel {
    constructor() {
        super();
        this.id = "timeline-track";
        this.addLayer();
    }


    public addLayer(): void {
        const layer: TimelineTrackLayer = new TimelineTrackLayer();
        this.subPanelContainer.append(layer);
    }


    public removeLayer(): void {
        this.subPanelContainer.children[0].remove();
    }

}

customElements.define("el-timeline-track", TimelineTrack);