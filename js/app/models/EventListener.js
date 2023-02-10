export class EventListener {

	#target;
	#type;
	#handler;

	constructor(target, type, handler) {
		this.#target = target;
		this.#type = type;
		this.#handler = handler;
		target.addEventListener(type, handler);
	}


	dispose() {
		this.#target.removeEventListener(this.#type, this.#handler);
		this.#target = null;
		this.#type = null;
		this.#handler = null;
	}
}