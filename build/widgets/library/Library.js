import { Panel } from "../../features/components/panel/Panel.js";
import { LibraryItemPreview } from "./LibraryItemPreview.js";
import { LibraryItemsList } from "./LibraryItemsList.js";
export class Library extends Panel {
    constructor() {
        super("Library");
        this.preview = new LibraryItemPreview();
        this.itemsList = new LibraryItemsList();
        this.id = "library";
        this.init();
    }
    init() {
        this.panelsContainer.append(this.preview, this.itemsList);
    }
}
customElements.define("el-library", Library);
//# sourceMappingURL=Library.js.map