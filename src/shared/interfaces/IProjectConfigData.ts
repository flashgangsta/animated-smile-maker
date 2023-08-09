import {ICanvasSize} from "./ICanvasSize";
import {TimelineLayersLayer} from "../../widgets/timeline/TimelineLayersLayer";

export interface IProjectConfigTimelineLayer {
    id:number
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