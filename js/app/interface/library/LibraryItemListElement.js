import {CustomElement} from "../CustomElement.js";

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

		//todo: dispose it
		this.addEventListener("click", (event) => {
			this.dispatchEvent(new Event("LIBRARY_ITEM_SELECTED", {bubbles: true}));
			this.classList.add("selected");
		});
	}


	get mediaFile() {
		return this.#mediaFile;
	}
}

customElements.define("library-item-list-el", LibraryItemListElement);