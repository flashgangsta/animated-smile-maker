var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LibraryItemListElement_icon, _LibraryItemListElement_mediaFile;
import { EventListener } from "../../models/EventListener.js";
import { ListElementWithRenameLabel } from "../ListElementWithRenameLabel.js";
import { Events } from "../../Events.js";
export class LibraryItemListElement extends ListElementWithRenameLabel {
    constructor(mediaFile) {
        super(mediaFile.name);
        _LibraryItemListElement_icon.set(this, new Image());
        _LibraryItemListElement_mediaFile.set(this, void 0);
        this.classList.add("library-item-list-el");
        __classPrivateFieldSet(this, _LibraryItemListElement_mediaFile, mediaFile, "f");
        if (mediaFile.type.startsWith("image/")) {
            __classPrivateFieldGet(this, _LibraryItemListElement_icon, "f").src = "./assets/image-ico.png";
        }
        this.prepend(__classPrivateFieldGet(this, _LibraryItemListElement_icon, "f"));
        this.listenEvents(new EventListener(this, Events.CLICK, (event) => {
            this.dispatchEvent(new Event(Events.LIBRARY_ITEM_SELECTED, { bubbles: true }));
            this.classList.add("selected");
        }), new EventListener(this, Events.LABEL_CHANGED, (event) => {
            mediaFile.name = this.labelText;
        }));
    }
    get mediaFile() {
        return __classPrivateFieldGet(this, _LibraryItemListElement_mediaFile, "f");
    }
    remove() {
        //todo: add dispose
        super.remove();
        __classPrivateFieldGet(this, _LibraryItemListElement_mediaFile, "f").dispose();
        __classPrivateFieldSet(this, _LibraryItemListElement_icon, null, "f");
        __classPrivateFieldSet(this, _LibraryItemListElement_mediaFile, null, "f");
    }
}
_LibraryItemListElement_icon = new WeakMap(), _LibraryItemListElement_mediaFile = new WeakMap();
customElements.define("library-item-list-el", LibraryItemListElement);
//# sourceMappingURL=LibraryItemListElement.js.map