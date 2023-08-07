import {ICanvasSize} from "../interfaces/ICanvasSize";

export class ProjectConfig extends EventTarget {
    private static instance:ProjectConfig;

    public projectName:string = "Untitled";
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
}