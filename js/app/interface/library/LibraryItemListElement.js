import {CustomElement} from "../CustomElement.js";
import {EventListener} from "../../models/EventListener.js";

export class LibraryItemListElement extends CustomElement {

	#label = document.createElement("label");
	#icon = new Image();
	#mediaFile;

	constructor(mediaFile) {
		super();
		this.classList.add("library-item-list-el");
		this.#mediaFile = mediaFile;
		this.#label.innerText = mediaFile.name;

		if(mediaFile.type.startsWith("image/")) {
			this.#icon.src = "./assets/image-ico.png";
		}

		this.append(this.#icon, this.#label);

		this.setEventListeners(
			new EventListener(this, "click", (event) => {
				this.dispatchEvent(new Event("LIBRARY_ITEM_SELECTED", {bubbles: true}));
				this.classList.add("selected");
			}),
		);
	}


	get mediaFile() {
		return this.#mediaFile;
	}


	remove() {
		//todo: add dispose
		super.remove();
		this.#label = null;
		this.#icon = null;
		this.#mediaFile = null;
	}
}

customElements.define("library-item-list-el", LibraryItemListElement);