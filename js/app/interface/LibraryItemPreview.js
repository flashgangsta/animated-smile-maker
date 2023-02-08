import {CustomElement} from "./CustomElement.js";

export class LibraryItemPreview extends CustomElement {
	constructor() {
		super();
		this.id = "library-item-preview";
	}
}

customElements.define("library-item-preview", LibraryItemPreview);