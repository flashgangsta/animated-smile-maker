import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {Events} from "../../shared/lib/Events";
import {EventListener} from "../../shared/utils/EventListener.js";
import {TimelineTrackLayer} from "./TimelineTrackLayer.js";
import {TimelineContextMenu} from "./TimelineContextMenu";

export class TimelineTrack extends SubPanel {
    constructor() {
        super();

        this.id = "timeline-track";

        this.addLayer();

        this.listenEvents(
            new EventListener(this, Events.TIMELINE_CONTEXT_CALL, (event: Event): void => { this.onContextCall(event as MouseEvent) })
        );
    }


    public addLayer(): void {
        const layer: TimelineTrackLayer = new TimelineTrackLayer();
        this.subPanelContainer.append(layer);
    }


    public removeLayer(): void {
        this.subPanelContainer.children[0].remove();
    }


    private onContextCall(event: MouseEvent): void {
        const timelineTrackLayer:TimelineTrackLayer = event.target as TimelineTrackLayer;
        const contextMenu: TimelineContextMenu | undefined = timelineTrackLayer.contextMenu;
        if(contextMenu) {
            contextMenu.setOffset(timelineTrackLayer.offsetLeft, timelineTrackLayer.offsetTop);
            this.append(contextMenu);
        }
    }

}

customElements.define("el-timeline-track", TimelineTrack);