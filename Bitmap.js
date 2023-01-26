import {DisplayObject} from "./DisplayObject.js";

export class Bitmap extends DisplayObject {

	#image = null;

	get image() {
		return this.#image;
	}

	constructor(image = null) {
		super();
		this.#image = image;
	}

}