import {Panel} from "../../features/components/panel/Panel.js";
import {TimelineLayers} from "./TimelineLayers.js";
import {TimelineTrack} from "./TimelineTrack.js";
import {Events} from "../../shared/lib/Events";
import {EventListener} from "../../shared/utils/EventListener.js";

export class Timeline extends Panel {

    private readonly timelineLayers: TimelineLayers;
    private readonly timelineTrack: TimelineTrack;
    constructor() {
        super("Timeline");
        this.id = "timeline";
        this.timelineLayers = new TimelineLayers();
        this.timelineTrack = new TimelineTrack();
        this.init();
    }

    private init() {
        this.panelsContainer.append(this.timelineLayers, this.timelineTrack);
        this.listenEvents(
            new EventListener(this.timelineLayers, Events.LAYER_ADDED, (event: Event): void => { this.timelineTrack.addLayer(); }),
            new EventListener(this.timelineLayers, Events.LAYER_REMOVED, (event: Event): void => { this.timelineTrack.removeLayer(); }),
            new EventListener(this.panelsContainer, Events.WHEEL, (event: Event): void => { this.onWheel(event as WheelEvent) })
        );
    }


    private onWheel(event: WheelEvent): void {
        const delta: number = event.deltaY;
        this.timelineLayers.subPanelContainer.scrollTop += delta;
        this.timelineTrack.subPanelContainer.scrollTop += delta;
    }
}

customElements.define("el-timeline", Timeline);