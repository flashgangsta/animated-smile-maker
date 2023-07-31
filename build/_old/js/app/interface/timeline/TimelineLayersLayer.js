var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimelineLayersLayer_id, _TimelineLayersLayer_projectConfig;
import { EventListener } from "../../models/EventListener.js";
import { ListElementWithRenameLabel } from "../ListElementWithRenameLabel.js";
import { ProjectConfig } from "../../ProjectConfig.js";
import { Events } from "../../Events.js";
export class TimelineLayersLayer extends ListElementWithRenameLabel {
    constructor(index, name = null) {
        super(name || `Layer ${index}`);
        _TimelineLayersLayer_id.set(this, void 0);
        _TimelineLayersLayer_projectConfig.set(this, new ProjectConfig());
        __classPrivateFieldSet(this, _TimelineLayersLayer_id, index, "f");
        this.classList.add("timeline-layers-layer");
        this.listenEvents(new EventListener(this, Events.CLICK, (event) => this.select(event)));
        __classPrivateFieldGet(this, _TimelineLayersLayer_projectConfig, "f").pushLibraryLayer(this);
    }
    select() {
        this.dispatchEvent(new Event(Events.LAYER_SELECT, { bubbles: true }));
        this.classList.add("selected");
    }
    unselect() {
        this.classList.remove("selected");
    }
    get id() {
        return __classPrivateFieldGet(this, _TimelineLayersLayer_id, "f");
    }
    serializeObject() {
        return {
            id: this.id,
            label: this.labelText,
        };
    }
    remove() {
        __classPrivateFieldGet(this, _TimelineLayersLayer_projectConfig, "f").removeLibraryLayer(this);
        super.remove();
    }
}
_TimelineLayersLayer_id = new WeakMap(), _TimelineLayersLayer_projectConfig = new WeakMap();
customElements.define("timeline-layers-layer", TimelineLayersLayer);
//# sourceMappingURL=TimelineLayersLayer.js.map