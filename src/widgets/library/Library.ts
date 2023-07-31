import {Panel} from "../../features/components/panel/Panel.js";
import {LibraryItemPreview} from "./LibraryItemPreview.js";
import {LibraryItemsList} from "./LibraryItemsList.js";

export class Library extends Panel {

    private readonly preview:LibraryItemPreview = new LibraryItemPreview();
    private readonly itemsList:LibraryItemsList = new LibraryItemsList();
    constructor() {
        super("Library");
        this.id = "library";
        this.init();
    }

    private init():void {
        this.panelsContainer.append(this.preview, this.itemsList);
    }
}

customElements.define("el-library", Library);