export class DisplayObject {

	x = 0;
	y = 0;
	width = 0;
	height = 0;
	#rotation = 0;

	name = null;

	set rotation(value) {
		this.#rotation = parseFloat(value) || 0;
	}

	get rotation() { return this.#rotation };

	constructor() {

	}
}