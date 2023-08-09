import { Panel } from "../../features/components/panel/Panel.js";
import { TimelineLayers } from "./TimelineLayers.js";
import { TimelineTrack } from "./TimelineTrack.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class Timeline extends Panel {
    constructor() {
        super("Timeline");
        this.id = "timeline";
        this.timelineLayers = new TimelineLayers();
        this.timelineTrack = new TimelineTrack();
        this.init();
    }
    init() {
        this.panelsContainer.append(this.timelineLayers, this.timelineTrack);
        this.listenEvents(new EventListener(this.timelineLayers, "LAYER_ADDED" /* Events.LAYER_ADDED */, (event) => { this.timelineTrack.addLayer(); }), new EventListener(this.timelineLayers, "LAYER_REMOVED" /* Events.LAYER_REMOVED */, (event) => { this.timelineTrack.removeLayer(); }), new EventListener(this.panelsContainer, "wheel" /* Events.WHEEL */, (event) => { this.onWheel(event); }));
        const subPanelContainers = this.querySelectorAll(".sub-panel-container");
        subPanelContainers.forEach((el) => {
            /*el.addEventListener(Events.MOUSE_WHEEL, (event) => {
                const target = el.scrollTop - (event.wheelDelta / 4);
                subPanelContainers.forEach((el) => {
                    el.scroll({left: 0, top: target});
                });
            }, {passive: true});*/
        });
    }
    onWheel(event) {
        const delta = event.deltaY;
        console.log("wheel", delta);
        this.timelineLayers.subPanelContainer.scrollTop += delta;
        this.timelineTrack.subPanelContainer.scrollTop += delta;
    }
}
customElements.define("el-timeline", Timeline);
//# sourceMappingURL=Timeline.js.map