import {ICanvasSize} from "../interfaces/ICanvasSize";
import {MediaFile} from "./MediaFile.js";
import {Events} from "../lib/Events";
import {
    IProjectConfig,
    IProjectConfigLibraryFile,
    IProjectConfigTimeline,
    IProjectConfigTimelineLayer
} from "../interfaces/IProjectConfigData";
import {TimelineLayersLayer} from "../../widgets/timeline/TimelineLayersLayer.js";

export class ProjectConfig extends EventTarget {
    private static instance:ProjectConfig;

    public projectName:string = "Untitled";
    public fileExt:string = ".anmtr";
    public canvasSize:ICanvasSize = {
        width: 550,
        height: 450
    }
    private library: MediaFile[] = [];
    private _lastImports: MediaFile[] = [];
    //todo: type it
    private timeline = {
        layers: []
    }

    private constructor() {
        super();
    }

    public static getInstance():ProjectConfig {
        if(!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }


    public loadProject(config:IProjectConfig): void {
        this.dispatchEvent(new Event(Events.PROJECT_OPEN));

        const library: IProjectConfigLibraryFile[] = config.library;
        if(library && library.length) {
            const mediaFilesList:MediaFile[] = library.map((fileModel: IProjectConfigLibraryFile) => {
                return new MediaFile(fileModel.name, fileModel.type, fileModel.base64);
            });

            this.pushLibraryMedia(...mediaFilesList);
        }

        const timeline: IProjectConfigTimeline = config.timeline;
        if(timeline && timeline.layers && timeline.layers.length) {
            const layers: IProjectConfigTimelineLayer[] = timeline.layers;
            this.clearTimelineData();


            layers.forEach((layerData: IProjectConfigTimelineLayer): void => {
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
        const index:number = this.library.findIndex((el: MediaFile) => el.name === mediaFile.name);
        this.library.splice(index, 1);
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


    public pushLibraryLayer(layer: TimelineLayersLayer) {
        this.libraryLayers.push(layer);
    }


    public removeLibraryLayer(layer: TimelineLayersLayer) {
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
}