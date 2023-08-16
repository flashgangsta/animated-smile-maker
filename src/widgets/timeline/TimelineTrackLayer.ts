import {TimelineKeyFrame} from "./TimelineKeyFrame.js";
import {getCSSVar} from "../../shared/utils/getCSSVar.js";
import {ElementWithContext} from "../../features/components/element_with_context/ElementWithContext.js";

export class TimelineTrackLayer extends ElementWithContext {

    private readonly FRAME_WIDTH: number = parseInt(getCSSVar("timeline-frame-width"));


    constructor() {
        super(
            {
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
            }
        );

        this.classList.add("timeline-track-layer");
        this.append(new TimelineKeyFrame());
    }


    private insertFrame() {

    }


    private insertKeyframe() {

    }


    private insertBlankKeyframe() {

    }
}

customElements.define("timeline-track-layer", TimelineTrackLayer);