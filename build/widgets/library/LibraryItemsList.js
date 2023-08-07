import { SubPanel } from "../../features/components/sub_panel/SubPanel.js";
import { PanelButtonRemove } from "../../entities/components/panel_button/PanelButtonRemove.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class LibraryItemsList extends SubPanel {
    constructor() {
        super();
        this.id = "library-items-list";
        const removeButton = new PanelButtonRemove();
        this.listenEvents(new EventListener(removeButton, "click" /* Events.CLICK */, (event) => {
            //TODO: Move this and same in TimelineLayers to extends class
            const selectedItem = this.selectedItem;
            if (selectedItem) {
                const children = this.subPanelContainer.children;
                const index = Array.from(children).indexOf(selectedItem);
                selectedItem.dispatchEvent(new Event("LIBRARY_ITEM_REMOVE" /* Events.LIBRARY_ITEM_REMOVE */, { bubbles: true }));
                selectedItem.remove();
                if (children.length) {
                    children[Math.min(index, children.length - 1)].click();
                }
                this.dispatchEvent(new Event("LIBRARY_ITEM_REMOVED" /* Events.LIBRARY_ITEM_REMOVED */, { bubbles: true }));
            }
        }));
        this.footer.append(removeButton);
    }
    get selectedItem() {
        return this.subPanelContainer.querySelector(".selected");
    }
}
customElements.define("library-items-list", LibraryItemsList);
//# sourceMappingURL=LibraryItemsList.js.map