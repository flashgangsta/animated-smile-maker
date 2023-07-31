import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {Events} from "../../shared/lib/Events.js";
import {PanelButtonRemove} from "../../entities/components/panel_button/PanelButtonRemove.js";

export class LibraryItemsList extends SubPanel {
    constructor() {
        super();
        this.id = "library-items-list";

        const removeButton:PanelButtonRemove = new PanelButtonRemove();

        removeButton.addEventListener(Events.CLICK, (event:Event) => {


        });

        this.footer.append(removeButton);
    }


    get selectedItem() {
        return this.subPanelContainer.querySelector(".selected");
    }

}

customElements.define("library-items-list", LibraryItemsList);