import {EventListener} from "../models/EventListener.js";

export class CustomElement extends HTMLElement {

	#eventListeners = [];
	#isAddedToDOM = false;

	constructor() {
		super();

		const thisAddedToDOMHandler = () => {
			this.#isAddedToDOM = true;
			this.stopListenEvent("ADDED_TO_DOM", thisAddedToDOMHandler);
		};

		this.listenEvents(new EventListener(this, "ADDED_TO_DOM", thisAddedToDOMHandler));
	}


	get isAddedToDom() {
		return this.#isAddedToDOM;
	}


	listenEvents(...eventListeners) {
		this.#eventListeners.push(...eventListeners);
	}


	stopListenEvents() {
		if(!this.#eventListeners) return
		this.#eventListeners.forEach((eventListener) => eventListener.dispose());
		this.#eventListeners = null;
	}


	stopListenEvent(type, handler) {
		const listenersByType = this.#eventListeners.filter(listener => listener.type === type);
		let result;

		if(handler) {
			result = listenersByType.filter(listener => listener.handler === handler);
		} else {
			result = listenersByType;
		}

		result.forEach((listener) => {
			const index = this.#eventListeners.indexOf(listener);
			this.#eventListeners.splice(index, 1);
			listener.dispose();
		});
	}


	remove() {
		this.stopListenEvents();
		this.removeChildren();
		super.remove();
		this.dispatchEvent(new Event("REMOVED_FROM_DOM"));
		this.#isAddedToDOM = false;
	}


	removeChildren() {
		Array.from(this.children).forEach((child) => {
			child.remove();
		});
	}


	append(...nodes) {
		super.append(...nodes);
		this.#dispatchAddedToDOM(...nodes);
	}


	prepend(...nodes) {
		super.prepend(...nodes);
		this.#dispatchAddedToDOM(...nodes);
	}


	#dispatchAddedToDOM(...nodes) {
		if(document.body.contains(this)) {
			nodes.forEach((node) => {
				if(!node.isAddedToDom) {
					node.dispatchEvent(new Event("ADDED_TO_DOM"));
				}
			});
		} else {
			const handler = () => {
				this.stopListenEvent("ADDED_TO_DOM", handler);
				Array.from(this.children).forEach((child) => {
					if(!child.isAddedToDom) {
						child.dispatchEvent(new Event("ADDED_TO_DOM"));
					}
				});
			}
			const event = new EventListener(this, "ADDED_TO_DOM", handler);
			this.listenEvents(event);
		}
	}

}