import { ElementBase } from "../../shared/ElementBase.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { TimelineContextMenu } from "./TimelineContextMenu.js";
import { TimelineKeyFrame } from "./TimelineKeyFrame.js";
export class TimelineTrackLayer extends ElementBase {
    constructor() {
        super();
        this.FRAME_WIDTH = 12;
        this._contextMenu = undefined;
        this.menuContent = {
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
        };
        this.classList.add("timeline-track-layer");
        this.append(new TimelineKeyFrame());
        this.listenEvents(new EventListener(this, "contextmenu" /* Events.CONTEXT_MENU */, (event) => this.onRightClick(event)));
    }
    onRightClick(event) {
        event.preventDefault();
        const rect = this.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const frameNum = Math.floor(x / this.FRAME_WIDTH) + 1;
        this.closeContext();
        this._contextMenu = new TimelineContextMenu(x, this.menuContent, () => this.closeContext());
        this.dispatchEvent(new Event("TIMELINE_CONTEXT_CALL" /* Events.TIMELINE_CONTEXT_CALL */, { bubbles: true }));
        return false;
    }
    closeContext() {
        var _a;
        (_a = this.contextMenu) === null || _a === void 0 ? void 0 : _a.remove();
        this._contextMenu = undefined;
    }
    insertFrame() {
    }
    insertKeyframe() {
    }
    insertBlankKeyframe() {
    }
    get contextMenu() {
        return this._contextMenu;
    }
}
customElements.define("timeline-track-layer", TimelineTrackLayer);
//# sourceMappingURL=TimelineTrackLayer.js.map