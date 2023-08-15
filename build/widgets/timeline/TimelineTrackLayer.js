import { TimelineKeyFrame } from "./TimelineKeyFrame.js";
import { getCSSVar } from "../../shared/utils/getCSSVar.js";
import { ElementWithContext } from "../../features/components/element_with_context/ElementWithContext.js";
export class TimelineTrackLayer extends ElementWithContext {
    constructor() {
        super({
            "Create Tween": {},
            "Insert Frame": {
                handler: () => this.insertFrame()
            },
            "Remove Frames": {},
            "Insert Keyframe": {
                handler: () => this.insertKeyframe()
            },
            "Insert Blank Keyframe": {
                handler: () => this.insertBlankKeyframe()
            },
            "Clear Keyframe": {},
            "Convert to Keyframes": {},
            "Convert to Blank Keyframes": {},
            "Cut Frames": {},
            "Copy Frames": {},
            "Paste Frames": {},
            "Paste and Overwrite Frames": {},
            "Clear Frames": {},
            "Select All Frames": {},
        });
        this.FRAME_WIDTH = parseInt(getCSSVar("timeline-frame-width"));
        this.classList.add("timeline-track-layer");
        this.append(new TimelineKeyFrame());
    }
    insertFrame() {
    }
    insertKeyframe() {
    }
    insertBlankKeyframe() {
    }
}
customElements.define("timeline-track-layer", TimelineTrackLayer);
//# sourceMappingURL=TimelineTrackLayer.js.map