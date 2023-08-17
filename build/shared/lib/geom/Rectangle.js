export class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        //todo: recalculate when x/y/width/height changed
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.right = x + width;
        this.bottom = y + height;
    }
    contains(x, y) {
        return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
    }
    copyFrom(boundingClientRect) {
        this.x = boundingClientRect.x;
        this.y = boundingClientRect.y;
        this.width = boundingClientRect.width;
        this.height = boundingClientRect.height;
        this.right = this.x + this.width;
        this.bottom = this.x + this.height;
    }
}
//# sourceMappingURL=Rectangle.js.map