import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {Events} from "../../shared/lib/Events";
import {PanelButtonRemove} from "../../entities/components/panel_button/PanelButtonRemove.js";
import {EventListener} from "../../shared/utils/EventListener.js";
import {LibraryItemListElement} from "./LibraryItemListElement.js";

export class LibraryItemsList extends SubPanel {
    constructor() {
        super();
        this.id = "library-items-list";

        const removeButton:PanelButtonRemove = new PanelButtonRemove();

        this.listenEvents(
            new EventListener(removeButton, Events.CLICK, (event: Event): void => {
                //TODO: Move this and same in TimelineLayers to extends class

                const selectedItem:Element | null = this.selectedItem;
                if(selectedItem) {
                    const children:HTMLCollection = this.subPanelContainer.children;
                    const index:number = Array.from(children).indexOf(selectedItem);
                    selectedItem.dispatchEvent(new Event(Events.LIBRARY_ITEM_REMOVE, {bubbles: true}));
                    selectedItem.remove();
                    if(children.length) {
                        (children[Math.min(index, children.length-1)] as HTMLElement).click();
                    }
                    this.dispatchEvent(new Event(Events.LIBRARY_ITEM_REMOVED, {bubbles: true}));
                }
            }),
        );

        this.footer.append(removeButton);
    }


    get selectedItem(): LibraryItemListElement | null {
        return this.subPanelContainer.querySelector(".selected") as LibraryItemListElement;
    }

}

customElements.define("library-items-list", LibraryItemsList);