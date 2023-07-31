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
var _ProjectConfig_instances, _ProjectConfig_projectName, _ProjectConfig_library, _ProjectConfig_lastImports, _ProjectConfig_timeline, _ProjectConfig_canvasSize, _ProjectConfig_clearTimelineData;
import { MediaFile } from "./models/MediaFile.js";
import { TimelineLayersLayer } from "./interface/timeline/TimelineLayersLayer.js";
import { Events } from "./Events.js";
export class ProjectConfig extends EventTarget {
    constructor() {
        _ProjectConfig_instances.add(this);
        _ProjectConfig_projectName.set(this, "");
        _ProjectConfig_library.set(this, []);
        _ProjectConfig_lastImports.set(this, void 0);
        _ProjectConfig_timeline.set(this, {
            layers: []
        });
        _ProjectConfig_canvasSize.set(this, {
            width: 550,
            height: 400
        });
        if (!ProjectConfig.instance) {
            super();
            ProjectConfig.instance = this;
        }
        return ProjectConfig.instance;
    }
    static getInstance() {
        return new ProjectConfig();
    }
    get projectName() { return __classPrivateFieldGet(this, _ProjectConfig_projectName, "f"); }
    ;
    set projectName(value) { __classPrivateFieldSet(this, _ProjectConfig_projectName, value, "f"); }
    ;
    loadProject(config) {
        this.dispatchEvent(new Event(Events.PROJECT_OPEN));
        const library = config.library;
        if (library && library.length) {
            const mediaFilesList = library.map((fileModel) => {
                const mediaFile = new MediaFile();
                mediaFile.write(fileModel);
                return mediaFile;
            });
            this.pushLibraryMedia(...mediaFilesList);
        }
        const timeline = config.timeline;
        if (timeline && timeline.layers && timeline.layers.length) {
            const layers = timeline.layers;
            __classPrivateFieldGet(this, _ProjectConfig_instances, "m", _ProjectConfig_clearTimelineData).call(this);
            layers.forEach((layerData) => {
                new TimelineLayersLayer(layerData.id, layerData.label);
            });
            this.dispatchEvent(new Event(Events.PROJECT_LAYERS_INIT));
        }
        __classPrivateFieldSet(this, _ProjectConfig_canvasSize, config.canvasSize, "f");
    }
    pushLibraryMedia(...mediaFiles) {
        __classPrivateFieldGet(this, _ProjectConfig_library, "f").push(...mediaFiles);
        __classPrivateFieldSet(this, _ProjectConfig_lastImports, [...mediaFiles], "f");
        this.dispatchEvent(new Event(Events.MEDIA_IMPORTED));
    }
    removeLibraryMedia(mediaFile) {
        const index = __classPrivateFieldGet(this, _ProjectConfig_library, "f").findIndex((el) => el.name === mediaFile.name);
        __classPrivateFieldGet(this, _ProjectConfig_library, "f").splice(index, 1);
        mediaFile.dispose();
    }
    get lastImports() {
        return __classPrivateFieldGet(this, _ProjectConfig_lastImports, "f");
    }
    toString() {
        return JSON.stringify({
            library: __classPrivateFieldGet(this, _ProjectConfig_library, "f").map(el => el.serializeObject()),
            timeline: {
                layers: this.libraryLayers.map((el) => el.serializeObject())
            },
            canvasSize: __classPrivateFieldGet(this, _ProjectConfig_canvasSize, "f"),
        });
    }
    get layersLength() {
        return this.libraryLayers.length;
    }
    get libraryLayers() {
        return __classPrivateFieldGet(this, _ProjectConfig_timeline, "f").layers;
    }
    get canvasSize() {
        return __classPrivateFieldGet(this, _ProjectConfig_canvasSize, "f");
    }
    pushLibraryLayer(layer) {
        this.libraryLayers.push(layer);
    }
    removeLibraryLayer(layer) {
        const index = this.libraryLayers.findIndex((el) => el.id === layer.id);
        this.libraryLayers.splice(index, 1);
    }
}
_ProjectConfig_projectName = new WeakMap(), _ProjectConfig_library = new WeakMap(), _ProjectConfig_lastImports = new WeakMap(), _ProjectConfig_timeline = new WeakMap(), _ProjectConfig_canvasSize = new WeakMap(), _ProjectConfig_instances = new WeakSet(), _ProjectConfig_clearTimelineData = function _ProjectConfig_clearTimelineData() {
    __classPrivateFieldSet(this, _ProjectConfig_timeline, {
        layers: [],
    }, "f");
};
//# sourceMappingURL=ProjectConfig.js.map