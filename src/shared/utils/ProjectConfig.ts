import {ICanvasSize} from "../interfaces/ICanvasSize";
import {MediaFile} from "./MediaFile.js";
import {Events} from "../lib/Events";
import {
    IProjectConfigJSON,
    IProjectConfigLibraryFileJSON, IProjectConfigTimeline,
    IProjectConfigTimelineJSON,
    IProjectConfigTimelineLayerJSON
} from "../interfaces/IProjectConfig";
import {TimelineLayersLayer} from "../../widgets/timeline/TimelineLayersLayer.js";

export class ProjectConfig extends EventTarget {
    private static instance: ProjectConfig;

    public projectName: string = "Untitled";
    public fileExt: string = ".anmtr";
    public canvasSize: ICanvasSize = {
        width: 550,
        height: 450
    }
    private library: MediaFile[] = [];
    private _lastImports: MediaFile[] = [];
    private timeline: IProjectConfigTimeline = {
        layers: []
    }

    private constructor() {
        super();
    }

    public static getInstance(): ProjectConfig {
        if (!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }


    public loadProject(config: IProjectConfigJSON): void {
        this.dispatchEvent(new Event(Events.PROJECT_OPEN));

        const library: IProjectConfigLibraryFileJSON[] = config.library;
        if (library && library.length) {
            const mediaFilesList: MediaFile[] = library.map((fileModel: IProjectConfigLibraryFileJSON) => {
                return new MediaFile(fileModel.name, fileModel.type, fileModel.base64);
            });

            this.pushLibraryMedia(...mediaFilesList);
        }

        const timeline: IProjectConfigTimelineJSON = config.timeline;
        if (timeline && timeline.layers && timeline.layers.length) {
            const layers: IProjectConfigTimelineLayerJSON[] = timeline.layers;
            this.clearTimelineData();


            layers.forEach((layerData: IProjectConfigTimelineLayerJSON): void => {
                new TimelineLayersLayer(layerData.id, layerData.label);
            })
            this.dispatchEvent(new Event(Events.PROJECT_LAYERS_INIT));
        }


        this.canvasSize = config.canvasSize;
    }


    public pushLibraryMedia(...mediaFiles: MediaFile[]): void {
        this.library.push(...mediaFiles);
        this._lastImports = [...mediaFiles];
        this.dispatchEvent(new Event(Events.MEDIA_IMPORTED));
    }


    public removeLibraryMedia(mediaFile: MediaFile): void {
        const index: number = this.library.findIndex((el: MediaFile): boolean => el.name === mediaFile.name);
        this.library.splice(index, 1);
    }


    public pushLibraryLayer(layer: TimelineLayersLayer): void {
        this.libraryLayers.push(layer);
    }


    public removeLibraryLayer(layer: TimelineLayersLayer): void {
        const index: number = this.libraryLayers.findIndex((el: TimelineLayersLayer): boolean => el.layerID === layer.layerID);
        this.libraryLayers.splice(index, 1);
    }


    public clearTimelineData(): void {
        this.timeline = {
            layers: [],
        }
    }

    public toJSONString(): string {
        return JSON.stringify({
            library: this.library.map((el: MediaFile) => el.serializeObject()),
            timeline: {
                layers: this.libraryLayers.map((el: TimelineLayersLayer) => el.serializeObject())
            },
            canvasSize: this.canvasSize,
        });
    }


    public get lastImports(): MediaFile[] {
        return this._lastImports;
    }


    public get libraryLayers(): TimelineLayersLayer[] {
        return this.timeline.layers;
    }


    public get layersLength(): number {
        return this.libraryLayers.length;
    }
}