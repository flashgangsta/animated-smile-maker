export class EventListener {

	#target;
	#type;
	#handler;

	constructor(target, type, handler, options=null) {
		this.#target = target;
		this.#type = type;
		this.#handler = handler;
		target.addEventListener(type, handler, options);
		/*console.log(target);
		console.log(type);
		console.log(handler);
		console.log(options);
		console.log("=========");*/
	}


	get type() {
		return this.#type;
	}


	get handler() {
		return this.#handler;
	}


	dispose() {
		this.#target.removeEventListener(this.#type, this.#handler);
		this.#target = null;
		this.#type = null;
		this.#handler = null;
	}
}