import { Rectangle } from "../geom/Rectangle.js";
export class DisplayObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
    }
    getRect() {
        //todo: thik about cache value
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=DisplayObject.js.map