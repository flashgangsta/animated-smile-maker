import { Rectangle } from "../geom/Rectangle.js";
export class DisplayObject {
    _x = 0;
    _y = 0;
    width = 0;
    height = 0;
    rotation = 0;
    isDragging = false;
    constructor() {
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