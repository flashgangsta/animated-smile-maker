import { ListElementWithRenameLabel } from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { Point } from "../../shared/lib/geom/Point.js";
export class LibraryItemListElement extends ListElementWithRenameLabel {
    icon = new Image();
    DRAG_CLASS_NAME = "library-el-start-drag";
    mediaFile;
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
        this.mediaFile = mediaFile;
        this.classList.add("library-item-list-el");
        if (mediaFile.type.startsWith("image/")) {
            this.icon.src = "./build/static/img/" /* Paths.STATIC_IMGS */ + "image-ico.png";
        }
        this.prepend(this.icon);
        this.listenEvents(new EventListener(this, "LABEL_CHANGED" /* Events.LABEL_CHANGED */, (event) => { mediaFile.name = this.labelText; }), new EventListener(this, "mousedown" /* Events.MOUSE_DOWN */, (event) => { this.onElementMouseDown(event); }));
    }
    selectItem() {
        this.dispatchEvent(new Event("LIBRARY_ITEM_SELECTED" /* Events.LIBRARY_ITEM_SELECTED */, { bubbles: true }));
        super.selectItem();
    }
    onElementMouseDown(event) {
        document.body.classList.add(this.DRAG_CLASS_NAME);
        this.listenEvents(new EventListener(window, "mouseup" /* Events.MOUSE_UP */, (event) => { this.onWindowMouseUp(event); }));
    }
    onWindowMouseUp(event) {
        document.body.classList.remove(this.DRAG_CLASS_NAME);
        this.stopListenEvent(window, "mouseup" /* Events.MOUSE_UP */);
        if (event.target instanceof HTMLCanvasElement) {
            const libraryMediaDropInfo = {
                media: this.mediaFile,
                point: new Point(event.pageX, event.pageY)
            };
            this.dispatchEvent(new CustomEvent("LIBRARY_ITEM_DROP_TO_SCENE" /* Events.LIBRARY_ITEM_DROP_TO_SCENE */, {
                bubbles: true,
                detail: libraryMediaDropInfo
            }));
        }
    }
}
customElements.define("el-library-item-list-element", LibraryItemListElement);
//# sourceMappingURL=LibraryItemListElement.js.map