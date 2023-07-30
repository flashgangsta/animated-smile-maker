import {DisplayObjectContainer} from "./DisplayObjectContainer.js";

export class Stage extends DisplayObjectContainer {

	#frameRate = 60;
	constructor() {
		super();
	}

	get frameRate() {return this.#frameRate};
	set frameRate(value) {
		this.#frameRate = Math.max(parseFloat(value), 0.01) || this.#frameRate;
	}
}