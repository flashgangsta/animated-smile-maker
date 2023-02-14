export class CustomElement extends HTMLElement {

	#eventListeners = [];

	constructor() {
		super();
	}


	get eventListeners() {
		return this.#eventListeners;
	}


	removeAndSetNewEventListeners(...eventListeners) {
		this.removeEventListeners();
		this.#eventListeners = [];
		this.#eventListeners.push(...eventListeners);
	}


	addEventListeners(...eventListeners) {
		this.#eventListeners.push(...eventListeners);
	}


	removeEventListeners() {
		if(!this.#eventListeners) return
		this.#eventListeners.forEach((eventListener) => eventListener.dispose());
		this.#eventListeners = null;
	}


	remove() {
		this.removeEventListeners();
		this.removeChildren();
		super.remove();
		this.dispatchEvent(new Event("REMOVED_FROM_DOM"));
	}


	removeChildren() {
		Array.from(this.children).forEach((child) => {
			child.remove();
		});
	}


	append(...nodes) {
		super.append(...nodes);

		nodes.forEach((node) => {
			this.#dispatchAddedToDOM(...nodes);
		});
	}


	prepend(...nodes) {
		super.prepend(...nodes);
		this.#dispatchAddedToDOM(...nodes);
	}


	#dispatchAddedToDOM(...nodes) {
		nodes.forEach((node) => {
			node.dispatchEvent(new Event("ADDED_TO_DOM"));
		});
	}

}