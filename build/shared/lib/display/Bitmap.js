import { DisplayObject } from "./DisplayObject.js";
export class Bitmap extends DisplayObject {
    constructor(image) {
        super();
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    get x() {
        return super.x;
    }
    get y() {
        return super.y;
    }
    set x(value) {
        this._xPrevious = super.x;
        super.x = value;
    }
    set y(value) {
        this._yPrevious = super.y;
        super.y = value;
    }
    get xPrevious() {
        var _a;
        return (_a = this._xPrevious) !== null && _a !== void 0 ? _a : super.x;
    }
    get yPrevious() {
        var _a;
        return (_a = this._yPrevious) !== null && _a !== void 0 ? _a : super.x;
    }
}
//# sourceMappingURL=Bitmap.js.map