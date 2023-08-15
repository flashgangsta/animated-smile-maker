import { ListElementWithRenameLabel } from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class LibraryItemListElement extends ListElementWithRenameLabel {
    constructor(mediaFile) {
        super(mediaFile.name, {
            "Cut": {},
            "Copy": {},
            "Paste": {},
            "Rename": {
                handler: () => this.setLabelEditable()
            },
            "Delete": {},
        });
        this.icon = new Image();
        this.mediaFile = mediaFile;
        this.classList.add("library-item-list-el");
        if (mediaFile.type.startsWith("image/")) {
            this.icon.src = "./build/static/img/" /* Paths.STATIC_IMGS */ + "image-ico.png";
        }
        this.prepend(this.icon);
        this.listenEvents(new EventListener(this, "click" /* Events.CLICK */, (event) => { this.selectItem(); }), new EventListener(this, "contextmenu" /* Events.CONTEXT_MENU */, (event) => { this.onRightClick(event); }), new EventListener(this, "LABEL_CHANGED" /* Events.LABEL_CHANGED */, (event) => { mediaFile.name = this.labelText; }));
    }
    selectItem() {
        this.dispatchEvent(new Event("LIBRARY_ITEM_SELECTED" /* Events.LIBRARY_ITEM_SELECTED */, { bubbles: true }));
        this.classList.add("selected");
    }
    onRightClick(event) {
        //todo: move to parent class this and same from TimelineTrackLayer (ElementWithContext class)
        super.onRightClick(event);
        this.selectItem();
    }
}
customElements.define("el-library-item-list-element", LibraryItemListElement);
//# sourceMappingURL=LibraryItemListElement.js.map