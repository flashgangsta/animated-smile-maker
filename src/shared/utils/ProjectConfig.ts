import {ICanvasSize} from "../interfaces/ICanvasSize";
import {MediaFile} from "./MediaFile.js";

export class ProjectConfig extends EventTarget {
    private static instance:ProjectConfig;

    public projectName:string = "Untitled";
    public fileExt:string = ".anmtr";
    public readonly canvasSize:ICanvasSize = {
        width: 550,
        height: 450
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

    pushLibraryMedia(...mediaFiles: MediaFile[]): void {
        console.log(mediaFiles);
    }
}