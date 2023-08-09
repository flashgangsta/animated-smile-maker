import { MediaFile } from "./MediaFile.js";
import { TimelineLayersLayer } from "../../widgets/timeline/TimelineLayersLayer.js";
export class ProjectConfig extends EventTarget {
    constructor() {
        super();
        this.projectName = "Untitled";
        this.fileExt = ".anmtr";
        this.canvasSize = {
            width: 550,
            height: 450
        };
        this.library = [];
        this._lastImports = [];
        this.timeline = {
            layers: []
        };
    }
    static getInstance() {
        if (!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }
    loadProject(config) {
        this.dispatchEvent(new Event("PROJECT_OPEN" /* Events.PROJECT_OPEN */));
        const library = config.library;
        if (library && library.length) {
            const mediaFilesList = library.map((fileModel) => {
                return new MediaFile(fileModel.name, fileModel.type, fileModel.base64);
            });
            this.pushLibraryMedia(...mediaFilesList);
        }
        const timeline = config.timeline;
        if (timeline && timeline.layers && timeline.layers.length) {
            const layers = timeline.layers;
            this.clearTimelineData();
            layers.forEach((layerData) => {
                new TimelineLayersLayer(layerData.id, layerData.label);
            });
            this.dispatchEvent(new Event("PROJECT_LAYERS_INIT" /* Events.PROJECT_LAYERS_INIT */));
        }
        this.canvasSize = config.canvasSize;
    }
    pushLibraryMedia(...mediaFiles) {
        this.library.push(...mediaFiles);
        this._lastImports = [...mediaFiles];
        this.dispatchEvent(new Event("MEDIA_IMPORTED" /* Events.MEDIA_IMPORTED */));
    }
    removeLibraryMedia(mediaFile) {
        const index = this.library.findIndex((el) => el.name === mediaFile.name);
        this.library.splice(index, 1);
    }
    get lastImports() {
        return this._lastImports;
    }
    get libraryLayers() {
        return this.timeline.layers;
    }
    get layersLength() {
        return this.libraryLayers.length;
    }
    pushLibraryLayer(layer) {
        this.libraryLayers.push(layer);
    }
    removeLibraryLayer(layer) {
        const index = this.libraryLayers.findIndex((el) => el.layerID === layer.layerID);
        this.libraryLayers.splice(index, 1);
    }
    clearTimelineData() {
        this.timeline = {
            layers: [],
        };
    }
    toJSONString() {
        return JSON.stringify({
            library: this.library.map((el) => el.serializeObject()),
            timeline: {
                layers: this.libraryLayers.map((el) => el.serializeObject())
            },
            canvasSize: this.canvasSize,
        });
    }
}
//# sourceMappingURL=ProjectConfig.js.map