import {ElementBase} from "../../shared/ElementBase.js";
import {EventListener} from "../../shared/utils/EventListener.js";
import {Events} from "../../shared/lib/Events";
import {TimelineContextMenu} from "./TimelineContextMenu.js";
import {IMenuContextItem} from "../../shared/interfaces/IMenuContentData";
import {TimelineKeyFrame} from "./TimelineKeyFrame.js";

export class TimelineTrackLayer extends ElementBase {

    private readonly FRAME_WIDTH: number = 12;
    private _contextMenu: TimelineContextMenu | undefined = undefined;
    private readonly menuContent:IMenuContextItem = {
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


    constructor() {
        super();
        this.classList.add("timeline-track-layer");
        this.append(new TimelineKeyFrame());

        this.listenEvents(
            new EventListener(this, Events.CONTEXT_MENU, (event: Event) => this.onRightClick(event as MouseEvent))
        );
    }

    private onRightClick(event: MouseEvent) {
        event.preventDefault();
        const rect: DOMRect = this.getBoundingClientRect();
        const x: number = event.clientX - rect.left;
        const frameNum: number = Math.floor(x / this.FRAME_WIDTH) + 1;

        this.closeContext();
        this._contextMenu = new TimelineContextMenu(x, this.menuContent, () => this.closeContext());
        this.dispatchEvent(new Event(Events.TIMELINE_CONTEXT_CALL, {bubbles: true}));

        return false;
    }


    private closeContext() {
        this.contextMenu?.remove();
        this._contextMenu = undefined;
    }


    private insertFrame() {

    }


    private insertKeyframe() {

    }


    private insertBlankKeyframe() {

    }


    get contextMenu(): TimelineContextMenu | undefined {
        return this._contextMenu;
    }
}

customElements.define("timeline-track-layer", TimelineTrackLayer);