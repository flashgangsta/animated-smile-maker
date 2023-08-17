import {Rectangle} from "../geom/Rectangle.js";

export class DisplayObject {

    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0
    public rotation: number = 0;

    constructor() {

    }

    public getRect():Rectangle {
        //todo: thik about cache value
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
}