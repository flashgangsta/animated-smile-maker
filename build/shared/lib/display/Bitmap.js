import { DisplayObject } from "./DisplayObject.js";
export class Bitmap extends DisplayObject {
    image;
    constructor(image) {
        super();
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
}
//# sourceMappingURL=Bitmap.js.map