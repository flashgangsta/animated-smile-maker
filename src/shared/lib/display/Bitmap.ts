import {DisplayObject} from "./DisplayObject.js";

export class Bitmap extends DisplayObject {

    public readonly image:HTMLImageElement;
    private _xPrevious: number = 0;
    private _yPrevious: number = 0;

    constructor(image:HTMLImageElement) {
        super();
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }


    override get x(): number {
        return super.x;
    }


    override get y(): number {
        return super.y;
    }


    override set x(value: number) {
        this._xPrevious = super.x;
        super.x = value;
    }


    override set y(value: number) {
        this._yPrevious = super.y;
        super.y = value;
    }

    get xPrevious(): number {
        return this._xPrevious;
    }

    get yPrevious(): number {
        return this._yPrevious;
    }
}