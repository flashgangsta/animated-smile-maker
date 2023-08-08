import {Panel} from "../../features/components/panel/Panel.js";
import {TimelineLayers} from "./TimelineLayers.js";
import {TimelineTrack} from "./TimelineTrack.js";
import {Events} from "../../shared/lib/Events";
import {EventListener} from "../../shared/utils/EventListener.js";

export class Timeline extends Panel {
    constructor() {
        super("Timeline");
        this.id = "timeline";
        this.init();
    }

    private init() {
        const timelineLayers: TimelineLayers = new TimelineLayers();
        const timelineTrack: TimelineTrack = new TimelineTrack();

        this.panelsContainer.append(timelineLayers, timelineTrack);

        this.listenEvents(
            new EventListener(timelineLayers, Events.LAYER_ADDED, (event: Event): void => { timelineTrack.addLayer(); }),
            new EventListener(timelineLayers, Events.LAYER_REMOVED, (event: Event): void => { timelineTrack.removeLayer(); }),
        );

        const subPanelContainers: NodeListOf<Element> = this.querySelectorAll(".sub-panel-container");

        subPanelContainers.forEach((el: Element) => {
            /*el.addEventListener(Events.MOUSE_WHEEL, (event) => {
                const target = el.scrollTop - (event.wheelDelta / 4);
                subPanelContainers.forEach((el) => {
                    el.scroll({left: 0, top: target});
                });
            }, {passive: true});*/
        })
    }
}

customElements.define("el-timeline", Timeline);