export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public right: number; //todo: set as readonly
    public bottom: number; //todo: set as readonly

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        //todo: recalculate when x/y/width/height changed
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.right = x + width;
        this.bottom = y + height;
    }


    public contains(x: number, y: number): boolean {
       return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
    }

    public copyFrom(boundingClientRect: Rectangle | DOMRect): void {
        this.x = boundingClientRect.x;
        this.y = boundingClientRect.y;
        this.width = boundingClientRect.width;
        this.height = boundingClientRect.height;
        this.right = this.x + this.width;
        this.bottom = this.x + this.height;
    }
}