import { ElementBase } from "../../shared/ElementBase.js";
export class TimelineKeyFrame extends ElementBase {
    constructor() {
        super();
        this.classList.add("timeline-key-frame");
    }
}
customElements.define("el-timeline-keyframe", TimelineKeyFrame);
//# sourceMappingURL=TimelineKeyFrame.js.map