import {ICanvasSize} from "./ICanvasSize";
import {TimelineLayersLayer} from "../../widgets/timeline/TimelineLayersLayer";

export interface IProjectConfigTimelineLayerJSON {
    id: number
    label: string
}

export interface IProjectConfigTimelineJSON {
    layers: IProjectConfigTimelineLayerJSON[]
}


export interface IProjectConfigLibraryFileJSON {
    name: string
    type: string
    base64: string
}


export interface IProjectConfigJSON {
    library: IProjectConfigLibraryFileJSON[]
    canvasSize: ICanvasSize
    timeline: IProjectConfigTimelineJSON
}


export interface IProjectConfigTimeline {
    layers: TimelineLayersLayer[]
}