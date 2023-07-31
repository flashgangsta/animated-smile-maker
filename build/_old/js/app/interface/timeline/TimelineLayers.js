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
var _TimelineLayers_instances, _TimelineLayers_projectConfig, _TimelineLayers_unnamedLayerNum, _TimelineLayers_addLayer, _TimelineLayers_removeSelectedLayer, _TimelineLayers_removeAllLayers, _TimelineLayers_getSelectedLayer, _TimelineLayers_onProjectOpen, _TimelineLayers_loadProjectLayers, _TimelineLayers_dispatchLayerAdded;
import { TimelineLayersLayer } from "./TimelineLayersLayer.js";
import { SubPanel } from "../panels/SubPanel.js";
import { PanelButton } from "../panels/PanelButton.js";
import { PanelButtonRemove } from "../panels/PanelButtonRemove.js";
import { ProjectConfig } from "../../ProjectConfig.js";
import { Events } from "../../Events.js";
export class TimelineLayers extends SubPanel {
    constructor() {
        super();
        _TimelineLayers_instances.add(this);
        _TimelineLayers_projectConfig.set(this, new ProjectConfig());
        _TimelineLayers_unnamedLayerNum.set(this, __classPrivateFieldGet(this, _TimelineLayers_projectConfig, "f").layersLength);
        this.id = "timeline-layers";
        const buttonVisibility = new PanelButton("./assets/eye-ico.png");
        const buttonLock = new PanelButton("./assets/lock-ico.png");
        const buttonNewLayer = new PanelButton("./assets/new-layer-ico.png");
        const buttonRemoveLayer = new PanelButtonRemove();
        __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_addLayer).call(this);
        buttonNewLayer.addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_addLayer).call(this));
        buttonRemoveLayer.addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_removeSelectedLayer).call(this));
        __classPrivateFieldGet(this, _TimelineLayers_projectConfig, "f").addEventListener(Events.PROJECT_OPEN, (event) => __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_onProjectOpen).call(this));
        __classPrivateFieldGet(this, _TimelineLayers_projectConfig, "f").addEventListener(Events.PROJECT_LAYERS_INIT, (event) => __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_loadProjectLayers).call(this));
        this.subPanelContainer.classList.add("layers-container");
        this.subPanelContainer.addEventListener(Events.LAYER_SELECT, (event) => {
            var _a;
            event.stopPropagation();
            (_a = __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_getSelectedLayer).call(this)) === null || _a === void 0 ? void 0 : _a.unselect();
        });
        this.header.append(buttonVisibility, buttonLock);
        this.footer.append(buttonNewLayer, buttonRemoveLayer);
    }
}
_TimelineLayers_projectConfig = new WeakMap(), _TimelineLayers_unnamedLayerNum = new WeakMap(), _TimelineLayers_instances = new WeakSet(), _TimelineLayers_addLayer = function _TimelineLayers_addLayer() {
    var _a;
    const layer = new TimelineLayersLayer(__classPrivateFieldSet(this, _TimelineLayers_unnamedLayerNum, (_a = __classPrivateFieldGet(this, _TimelineLayers_unnamedLayerNum, "f"), ++_a), "f"));
    const lastSelectedLayer = __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_getSelectedLayer).call(this);
    if (lastSelectedLayer) {
        lastSelectedLayer.unselect();
        this.subPanelContainer.insertBefore(layer, lastSelectedLayer);
    }
    else {
        this.subPanelContainer.prepend(layer);
    }
    layer.select();
    __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_dispatchLayerAdded).call(this);
}, _TimelineLayers_removeSelectedLayer = function _TimelineLayers_removeSelectedLayer() {
    //TODO: Move this and same in LibraryItemsList to extends class
    const layersList = this.subPanelContainer.children;
    if (layersList.length > 1) {
        const selectedLayer = __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_getSelectedLayer).call(this);
        const selectedLayerIndex = Array.from(layersList).indexOf(selectedLayer);
        selectedLayer.remove();
        layersList[Math.min(selectedLayerIndex, layersList.length - 1)].select();
        this.dispatchEvent(new Event(Events.LAYER_REMOVED, { bubbles: true }));
    }
}, _TimelineLayers_removeAllLayers = function _TimelineLayers_removeAllLayers() {
    const layersList = Array.from(this.subPanelContainer.children);
    layersList.forEach((layer) => {
        layer.remove();
        this.dispatchEvent(new Event(Events.LAYER_REMOVED, { bubbles: true }));
    });
}, _TimelineLayers_getSelectedLayer = function _TimelineLayers_getSelectedLayer() {
    return this.subPanelContainer.querySelector(".selected");
}, _TimelineLayers_onProjectOpen = function _TimelineLayers_onProjectOpen() {
    __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_removeAllLayers).call(this);
}, _TimelineLayers_loadProjectLayers = function _TimelineLayers_loadProjectLayers() {
    const layersList = __classPrivateFieldGet(this, _TimelineLayers_projectConfig, "f").libraryLayers;
    layersList.forEach((layer) => {
        this.subPanelContainer.prepend(layer);
        __classPrivateFieldGet(this, _TimelineLayers_instances, "m", _TimelineLayers_dispatchLayerAdded).call(this);
    });
    layersList[layersList.length - 1].select();
}, _TimelineLayers_dispatchLayerAdded = function _TimelineLayers_dispatchLayerAdded() {
    this.dispatchEvent(new Event(Events.LAYER_ADDED, { bubbles: true }));
};
customElements.define("timeline-layers-el", TimelineLayers);
//# sourceMappingURL=TimelineLayers.js.map