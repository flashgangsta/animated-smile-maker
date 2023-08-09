import { Panel } from "../../features/components/panel/Panel.js";
import { LibraryItemPreview } from "./LibraryItemPreview.js";
import { LibraryItemsList } from "./LibraryItemsList.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { LibraryItemListElement } from "./LibraryItemListElement.js";
export class Library extends Panel {
    constructor() {
        super("Library");
        this.preview = new LibraryItemPreview();
        this.itemsList = new LibraryItemsList();
        this.projectConfig = ProjectConfig.getInstance();
        this.id = "library";
        this.init();
    }
    init() {
        const projectConfig = this.projectConfig;
        this.listenEvents(new EventListener(projectConfig, "MEDIA_IMPORTED" /* Events.MEDIA_IMPORTED */, (event) => { this.onMediaImported(); }), new EventListener(this.itemsList, "LIBRARY_ITEM_SELECTED" /* Events.LIBRARY_ITEM_SELECTED */, (event) => { this.onItemSelect(event); }), new EventListener(this.itemsList, "LIBRARY_ITEM_REMOVE" /* Events.LIBRARY_ITEM_REMOVE */, (event) => { this.onItemRemove(event); }), new EventListener(this.itemsList, "LIBRARY_ITEM_REMOVED" /* Events.LIBRARY_ITEM_REMOVED */, (event) => { this.onItemRemoved(event); }), new EventListener(this.projectConfig, "PROJECT_OPEN" /* Events.PROJECT_OPEN */, (event) => { this.clearLibrary(); }));
        this.panelsContainer.append(this.preview, this.itemsList);
    }
    onMediaImported() {
        const imports = this.projectConfig.lastImports;
        imports.forEach((mediaFile) => {
            const libraryItemListElement = new LibraryItemListElement(mediaFile);
            this.itemsList.subPanelContainer.append(libraryItemListElement);
        });
    }
    onItemSelect(event) {
        const selectedItem = event.target;
        const lastSelectedItem = this.itemsList.selectedItem;
        event.stopPropagation();
        if (selectedItem === lastSelectedItem) {
            return;
        }
        const image = new Image();
        this.removePreviewImage();
        image.src = selectedItem.mediaFile.base64;
        lastSelectedItem === null || lastSelectedItem === void 0 ? void 0 : lastSelectedItem.classList.remove("selected");
        selectedItem.classList.add("selected");
        this.preview.append(image);
    }
    removePreviewImage() {
        var _a;
        (_a = this.preview.children[0]) === null || _a === void 0 ? void 0 : _a.remove();
    }
    onItemRemove(event) {
        this.projectConfig.removeLibraryMedia(event.target.mediaFile);
    }
    onItemRemoved(event) {
        event.stopPropagation();
        if (!this.itemsList.subPanelContainer.children.length) {
            this.removePreviewImage();
        }
    }
    clearLibrary() {
        this.removePreviewImage();
        Array.from(this.itemsList.subPanelContainer.children).forEach((libraryItem) => {
            libraryItem.remove();
        });
    }
}
customElements.define("el-library", Library);
//# sourceMappingURL=Library.js.map