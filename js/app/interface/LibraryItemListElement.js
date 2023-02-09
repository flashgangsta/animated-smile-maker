import {CustomElement} from "./CustomElement.js";

export class LibraryItemListElement extends CustomElement {

	#label = document.createElement("label");
	#icon = new Image();
	#file;

	constructor(file) {
		super();
		this.classList.add("library-item-list-el");
		this.#file = file;
		this.#label.innerText = file.name;

		if(file.type.startsWith("image/")) {
			this.#icon.src = "./assets/image-ico.png";
		}

		this.append(this.#icon, this.#label);

		//todo: dispose it
		this.addEventListener("click", (event) => {
			this.dispatchEvent(new Event("LIBRARY_ITEM_SELECTED", {bubbles: true}));
			this.classList.add("selected");
		});
	}


	get file() {
		return this.#file;
	}
}

customElements.define("library-item-list-el", LibraryItemListElement);