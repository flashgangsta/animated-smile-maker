import {ICanvasSize} from "../interfaces/ICanvasSize";
import {MediaFile} from "./MediaFile.js";
import {Events} from "../lib/Events";

export class ProjectConfig extends EventTarget {
    private static instance:ProjectConfig;

    public projectName:string = "Untitled";
    public fileExt:string = ".anmtr";
    public readonly canvasSize:ICanvasSize = {
        width: 550,
        height: 450
    }
    private library: MediaFile[] = [];
    private _lastImports: MediaFile[] = [];

    private constructor() {
        super();
    }

    public static getInstance():ProjectConfig {
        if(!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }

    public pushLibraryMedia(...mediaFiles: MediaFile[]): void {
        this.library.push(...mediaFiles);
        this._lastImports = [...mediaFiles];
        this.dispatchEvent(new Event(Events.MEDIA_IMPORTED));
    }


    public removeLibraryMedia(mediaFile: MediaFile) {
        const index:number = this.library.findIndex((el: MediaFile) => el.name === mediaFile.name);
        this.library.splice(index, 1);
    }


    public get lastImports(): MediaFile[] {
        return this._lastImports;
    }
}