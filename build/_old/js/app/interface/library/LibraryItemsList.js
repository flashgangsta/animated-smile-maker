import { SubPanel } from "../panels/SubPanel.js";
import { PanelButtonRemove } from "../panels/PanelButtonRemove.js";
import { Events } from "../../Events.js";
export class LibraryItemsList extends SubPanel {
    constructor() {
        super();
        this.id = "library-items-list";
        const removeButton = new PanelButtonRemove();
        removeButton.addEventListener(Events.CLICK, (event) => {
            //TODO: Move this and same in TimelineLayers to extends class
            const selectedItem = this.selectedItem;
            if (selectedItem) {
                const children = this.subPanelContainer.children;
                const index = Array.from(children).indexOf(selectedItem);
                selectedItem.dispatchEvent(new Event(Events.LIBRARY_ITEM_REMOVE, { bubbles: true }));
                selectedItem.remove();
                if (children.length) {
                    children[Math.min(index, children.length - 1)].click();
                }
                this.dispatchEvent(new Event(Events.LIBRARY_ITEM_REMOVED, { bubbles: true }));
            }
        });
        this.footer.append(removeButton);
    }
    get selectedItem() {
        return this.subPanelContainer.querySelector(".selected");
    }
}
customElements.define("library-items-list", LibraryItemsList);
//# sourceMappingURL=LibraryItemsList.js.map