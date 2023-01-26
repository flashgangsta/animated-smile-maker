import {Easings} from "./Easings.js";

export class Tween {

	static #framerate;
	static #tickTimer;

	#currentFrame = 0;
	#totalFrames;
	#el;
	#propertiesKeysList;
	#startValues = {};
	#targetValues = {};
	#distances = {};
	#easingFunction;
	#onCompleteCallback;

	static init(framerate = 120) {
		Tween.#framerate = framerate;
		Tween.#tickTimer = 1000 / Tween.#framerate;
	}

	get el() {
		return this.#el;
	}

	constructor(el, properties, easing = Easings.LINEAR, duration, onComplete=null) {
		this.#totalFrames = Math.round(duration / Tween.#tickTimer);
		this.#propertiesKeysList = Object.keys(properties);
		this.#el = el;
		this.#easingFunction = easing;
		this.#onCompleteCallback = onComplete;

		this.#propertiesKeysList.forEach((key) => {
			this.#startValues[key] = el[key];
			this.#targetValues[key] = properties[key];
			this.#distances[key] = properties[key] - el[key];
		});
	}

	goToNextFrame() {
		this.#currentFrame++;
		const position = this.#easingFunction(this.#currentFrame / this.#totalFrames);

		this.#propertiesKeysList.forEach((key) => {
			this.#el[key] = this.#startValues[key] + (this.#distances[key] * position);
		});

		if(!!this.#onCompleteCallback && this.#currentFrame === this.#totalFrames) {
			this.#onCompleteCallback(this);
		}
	}

}