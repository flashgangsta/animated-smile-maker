var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TimelineTrackLayer_instances, _TimelineTrackLayer_frameWidth, _TimelineTrackLayer_contextMenu, _TimelineTrackLayer_menuContent, _TimelineTrackLayer_onRightClick, _TimelineTrackLayer_closeContext, _TimelineTrackLayer_insertFrame, _TimelineTrackLayer_insertKeyframe, _TimelineTrackLayer_insertBlankKeyframe;
import { TimelineKeyFrame } from "./TimelineKeyFrame.js";
import { CustomElement } from "../CustomElement.js";
import { EventListener } from "../../models/EventListener.js";
import { Events } from "../../Events.js";
import { TimelineContextMenu } from "./TimelineContextMenu.js";
export class TimelineTrackLayer extends CustomElement {
    constructor() {
        super();
        _TimelineTrackLayer_instances.add(this);
        _TimelineTrackLayer_frameWidth.set(this, 12);
        _TimelineTrackLayer_contextMenu.set(this, null);
        _TimelineTrackLayer_menuContent.set(this, {
            "Create Tween": {},
            "Insert Frame": {
                handler: () => __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_insertFrame).call(this)
            },
            "Remove Frames": {},
            "Insert Keyframe": {
                handler: () => __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_insertKeyframe).call(this)
            },
            "Insert Blank Keyframe": {
                handler: () => __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_insertBlankKeyframe).call(this)
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
        this.classList.add("timeline-track-layer");
        this.append(new TimelineKeyFrame());
        this.listenEvents(new EventListener(this, Events.CONTEXT_MENU, (event) => __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_onRightClick).call(this, event)));
    }
    get contextMenu() {
        return __classPrivateFieldGet(this, _TimelineTrackLayer_contextMenu, "f");
    }
}
_TimelineTrackLayer_frameWidth = new WeakMap(), _TimelineTrackLayer_contextMenu = new WeakMap(), _TimelineTrackLayer_menuContent = new WeakMap(), _TimelineTrackLayer_instances = new WeakSet(), _TimelineTrackLayer_onRightClick = function _TimelineTrackLayer_onRightClick(event) {
    event.preventDefault();
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const frameNum = Math.floor(x / __classPrivateFieldGet(this, _TimelineTrackLayer_frameWidth, "f")) + 1;
    console.log("frame N:", frameNum);
    __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_closeContext).call(this);
    __classPrivateFieldSet(this, _TimelineTrackLayer_contextMenu, new TimelineContextMenu(x, __classPrivateFieldGet(this, _TimelineTrackLayer_menuContent, "f"), () => __classPrivateFieldGet(this, _TimelineTrackLayer_instances, "m", _TimelineTrackLayer_closeContext).call(this)), "f");
    this.dispatchEvent(new Event(Events.TIMELINE_CONTEXT_CALL, { bubbles: true }));
    return false;
}, _TimelineTrackLayer_closeContext = function _TimelineTrackLayer_closeContext() {
    var _a;
    (_a = __classPrivateFieldGet(this, _TimelineTrackLayer_contextMenu, "f")) === null || _a === void 0 ? void 0 : _a.remove();
    __classPrivateFieldSet(this, _TimelineTrackLayer_contextMenu, null, "f");
}, _TimelineTrackLayer_insertFrame = function _TimelineTrackLayer_insertFrame() {
}, _TimelineTrackLayer_insertKeyframe = function _TimelineTrackLayer_insertKeyframe() {
}, _TimelineTrackLayer_insertBlankKeyframe = function _TimelineTrackLayer_insertBlankKeyframe() {
};
customElements.define("timeline-track-layer", TimelineTrackLayer);
//# sourceMappingURL=TimelineTrackLayer.js.map