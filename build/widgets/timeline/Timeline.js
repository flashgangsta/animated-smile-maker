import { Panel } from "../../features/components/panel/Panel.js";
import { TimelineLayers } from "./TimelineLayers.js";
import { TimelineTrack } from "./TimelineTrack.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class Timeline extends Panel {
    constructor() {
        super("Timeline");
        this.id = "timeline";
        this.init();
    }
    init() {
        const timelineLayers = new TimelineLayers();
        const timelineTrack = new TimelineTrack();
        this.panelsContainer.append(timelineLayers, timelineTrack);
        this.listenEvents(new EventListener(timelineLayers, "LAYER_ADDED" /* Events.LAYER_ADDED */, (event) => { timelineTrack.addLayer(); }), new EventListener(timelineLayers, "LAYER_REMOVED" /* Events.LAYER_REMOVED */, (event) => { timelineTrack.removeLayer(); }));
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
}
customElements.define("el-timeline", Timeline);
//# sourceMappingURL=Timeline.js.map