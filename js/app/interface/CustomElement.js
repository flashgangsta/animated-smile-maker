export class CustomElement extends HTMLElement {

	#eventListeners;

	constructor() {
		super();
	}


	get eventListeners() {
		return this.#eventListeners;
	}


	setEventListeners(...eventListeners) {
		this.removeEventListeners();
		this.#eventListeners = [];
		this.#eventListeners.push(...eventListeners);
	}


	removeEventListeners() {
		if(!this.#eventListeners) return
		this.#eventListeners.forEach((eventListener) => eventListener.dispose());
		this.#eventListeners = null;
	}


	remove() {
		this.removeEventListeners();
		Array.from(this.children).forEach((child) => {
			child.remove();
		})
		super.remove();
	}
}