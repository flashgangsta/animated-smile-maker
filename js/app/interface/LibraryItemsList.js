import {SubPanel} from "./SubPanel.js";
import {PanelButtonRemove} from "./PanelButtonRemove.js";


export class LibraryItemsList extends SubPanel {


	constructor() {
		super();
		this.id = "library-items-list";

		const removeButton = new PanelButtonRemove();

		removeButton.addEventListener("click", (event) => {
			const selectedItem = this.selectedItem;
			if(selectedItem) {
				const children = this.subPanelContainer.children;
				const index = Array.from(children).indexOf(selectedItem);
				selectedItem.remove();
				if(children.length) {
					children[Math.min(index, children.length-1)].click();
				}
				this.dispatchEvent(new Event("LIBRARY_ITEM_REMOVED", {bubbles: true}));
			}
		});

		this.footer.append(removeButton);
	}


	get selectedItem() {
		return this.subPanelContainer.querySelector(".selected");
	}

}

customElements.define("library-items-list", LibraryItemsList);