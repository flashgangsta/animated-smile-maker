export class MediaFile {

	#name;
	#base64;
	#type;

	constructor(name, type, base64) {
		if(name || type || base64) this.write({name, type, base64});
	}


	write(data) {
		this.#name = data.name;
		this.#base64 = data.base64;
		this.#type = data.type;
	}


	get name() {
		return this.#name;
	}


	get base64() {
		return this.#base64;
	}

	get type() {
		return this.#type;
	}

	toString() {
		return JSON.stringify(this.serializeObject());
	}


	serializeObject() {
		return {
			name: this.#name,
			type: this.#type,
			base64: this.#base64
		}
	}
}