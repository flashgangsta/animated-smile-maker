import { Rectangle } from "../geom/Rectangle.js";
export class DisplayObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.isDragging = false;
    }
    getRect() {
        //todo: think about cache value
        return new Rectangle(this._x, this._y, this.width, this.height);
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}
//# sourceMappingURL=DisplayObject.js.map