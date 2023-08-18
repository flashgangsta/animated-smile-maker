import {Rectangle} from "../geom/Rectangle.js";

export class DisplayObject {

    private _x: number = 0;
    private _y: number = 0;
    public width: number = 0;
    public height: number = 0
    public rotation: number = 0;
    public isDragging: boolean = false;

    constructor() {

    }

    public getRect():Rectangle {
        //todo: think about cache value
        return new Rectangle(this._x, this._y, this.width, this.height);
    }


    set x(value: number) {
        this._x = value;
    }


    set y(value: number) {
        this._y = value;
    }


    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}