import {ElementBase} from "../../shared/ElementBase.js";

export class LibraryItemPreview extends ElementBase {
    constructor() {
        super();
        this.id = "library-item-preview";
    }
}

customElements.define("el-library-item-preview", LibraryItemPreview);