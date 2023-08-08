import {ICanvasSize} from "./ICanvasSize";

export interface IProjectConfigTimelineLayer {
    id:string
    label:string
}

export interface IProjectConfigTimeline {
    layers:IProjectConfigTimelineLayer[]
}


export interface IProjectConfigLibraryFile {
    name:string
    type:string
    base64:string
}


export interface IProjectConfig {
    library:IProjectConfigLibraryFile[]
    canvasSize:ICanvasSize
    timeline:IProjectConfigTimeline
}