import {DisplayObject} from "./DisplayObject.js";

export class Bitmap extends DisplayObject {

    public readonly image:HTMLImageElement;

    constructor(image:HTMLImageElement) {
        super();
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
}