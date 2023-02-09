import {Panel} from "./Panel.js";
import {ProjectConfig} from "../ProjectConfig.js";
import {LibraryItemPreview} from "./LibraryItemPreview.js";
import {LibraryItemListElement} from "./LibraryItemListElement.js";
import {SubPanel} from "./SubPanel.js";
import {LibraryItemsList} from "./LibraryItemsList.js";


export class Library extends Panel {

	#projectConfig = new ProjectConfig();
	#preview = new LibraryItemPreview();
	#itemsList = new LibraryItemsList();

	constructor() {
		super("Library");

		this.id = "library";

		this.#projectConfig.addEventListener("MEDIA_IMPORTED", (event) => {
			const imports = this.#projectConfig.lastImports;
			imports.forEach((file) => {
				const libraryItemListElement = new LibraryItemListElement(file);
				this.#itemsList.subPanelContainer.append(libraryItemListElement);
			});
		});

		this.#itemsList.id = "library-items-list";
		this.#itemsList.addEventListener("LIBRARY_ITEM_SELECTED", (event) => {
			const selectedItem = event.target;
			const image = new Image();
			const lastImage = this.#preview.children[0];

			event.preventDefault();

			if(lastImage) {
				URL.revokeObjectURL(lastImage.src);
				lastImage.remove();
			}

			image.src = URL.createObjectURL(selectedItem.file);
			this.#itemsList.querySelector(".selected")?.classList.remove("selected");
			selectedItem.classList.add("selected");
			this.#preview.append(image);
		})

		this.panelsContainer.append(this.#preview, this.#itemsList);
	}
}

customElements.define("library-el", Library);