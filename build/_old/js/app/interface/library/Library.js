var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Library_instances, _Library_projectConfig, _Library_preview, _Library_itemsList, _Library_removePreviewImage, _Library_clearLibrary;
import { LibraryItemPreview } from "./LibraryItemPreview.js";
import { LibraryItemListElement } from "./LibraryItemListElement.js";
import { LibraryItemsList } from "./LibraryItemsList.js";
import { Panel } from "../panels/Panel.js";
import { ProjectConfig } from "../../ProjectConfig.js";
import { Events } from "../../Events.js";
export class Library extends Panel {
    constructor() {
        super("Library");
        _Library_instances.add(this);
        _Library_projectConfig.set(this, new ProjectConfig());
        _Library_preview.set(this, new LibraryItemPreview());
        _Library_itemsList.set(this, new LibraryItemsList());
        this.id = "library";
        __classPrivateFieldGet(this, _Library_projectConfig, "f").addEventListener(Events.MEDIA_IMPORTED, (event) => {
            const imports = __classPrivateFieldGet(this, _Library_projectConfig, "f").lastImports;
            imports.forEach((mediaFile) => {
                const libraryItemListElement = new LibraryItemListElement(mediaFile);
                __classPrivateFieldGet(this, _Library_itemsList, "f").subPanelContainer.append(libraryItemListElement);
            });
        });
        __classPrivateFieldGet(this, _Library_itemsList, "f").addEventListener(Events.LIBRARY_ITEM_SELECTED, (event) => {
            const selectedItem = event.target;
            const lastSelectedItem = __classPrivateFieldGet(this, _Library_itemsList, "f").selectedItem;
            event.stopPropagation();
            if (selectedItem === lastSelectedItem) {
                return;
            }
            const image = new Image();
            __classPrivateFieldGet(this, _Library_instances, "m", _Library_removePreviewImage).call(this);
            image.src = selectedItem.mediaFile.base64;
            lastSelectedItem === null || lastSelectedItem === void 0 ? void 0 : lastSelectedItem.classList.remove("selected");
            selectedItem.classList.add("selected");
            __classPrivateFieldGet(this, _Library_preview, "f").append(image);
        });
        this.addEventListener(Events.LIBRARY_ITEM_REMOVE, (event) => {
            __classPrivateFieldGet(this, _Library_projectConfig, "f").removeLibraryMedia(event.target.mediaFile);
        });
        this.addEventListener(Events.LIBRARY_ITEM_REMOVED, (event) => {
            event.stopPropagation();
            if (!__classPrivateFieldGet(this, _Library_itemsList, "f").subPanelContainer.children.length) {
                __classPrivateFieldGet(this, _Library_instances, "m", _Library_removePreviewImage).call(this);
            }
        });
        __classPrivateFieldGet(this, _Library_projectConfig, "f").addEventListener(Events.PROJECT_OPEN, (event) => __classPrivateFieldGet(this, _Library_instances, "m", _Library_clearLibrary).call(this));
        this.panelsContainer.append(__classPrivateFieldGet(this, _Library_preview, "f"), __classPrivateFieldGet(this, _Library_itemsList, "f"));
    }
}
_Library_projectConfig = new WeakMap(), _Library_preview = new WeakMap(), _Library_itemsList = new WeakMap(), _Library_instances = new WeakSet(), _Library_removePreviewImage = function _Library_removePreviewImage() {
    const image = __classPrivateFieldGet(this, _Library_preview, "f").children[0];
    if (image) {
        image.remove();
    }
}, _Library_clearLibrary = function _Library_clearLibrary() {
    __classPrivateFieldGet(this, _Library_instances, "m", _Library_removePreviewImage).call(this);
    Array.from(__classPrivateFieldGet(this, _Library_itemsList, "f").subPanelContainer.children).forEach((libraryItem) => {
        libraryItem.remove();
    });
};
customElements.define("library-el", Library);
//# sourceMappingURL=Library.js.map