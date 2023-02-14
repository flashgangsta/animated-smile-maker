import {LibraryItemPreview} from "./LibraryItemPreview.js";
import {LibraryItemListElement} from "./LibraryItemListElement.js";
import {LibraryItemsList} from "./LibraryItemsList.js";
import {Panel} from "../panels/Panel.js";
import {ProjectConfig} from "../../ProjectConfig.js";


export class Library extends Panel {

	#projectConfig = new ProjectConfig();
	#preview = new LibraryItemPreview();
	#itemsList = new LibraryItemsList();

	constructor() {
		super("Library");

		this.id = "library";

		this.#projectConfig.addEventListener("MEDIA_IMPORTED", (event) => {
			const imports = this.#projectConfig.lastImports;
			imports.forEach((mediaFile) => {
				const libraryItemListElement = new LibraryItemListElement(mediaFile);
				this.#itemsList.subPanelContainer.append(libraryItemListElement);
			});
		});


		this.#itemsList.addEventListener("LIBRARY_ITEM_SELECTED", (event) => {
			const selectedItem = event.target;
			const lastSelectedItem = this.#itemsList.selectedItem;

			event.stopPropagation();

			if(selectedItem === lastSelectedItem) {
				return;
			}

			const image = new Image();

			this.#removePreviewImage();

			image.src = selectedItem.mediaFile.base64;
			lastSelectedItem?.classList.remove("selected");
			selectedItem.classList.add("selected");
			this.#preview.append(image);
		});


		this.addEventListener("LIBRARY_ITEM_REMOVE", (event) => {
			this.#projectConfig.removeLibraryMedia(event.target.mediaFile);
		})


		this.addEventListener("LIBRARY_ITEM_REMOVED", (event) => {
			event.stopPropagation();

			if(!this.#itemsList.subPanelContainer.children.length) {
				this.#removePreviewImage();
			}
		});

		this.panelsContainer.append(this.#preview, this.#itemsList);
	}


	#removePreviewImage() {
		const image = this.#preview.children[0];
		if(image) {
			image.remove();
		}
	}
}

customElements.define("library-el", Library);