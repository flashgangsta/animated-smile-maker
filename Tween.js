import {Easings} from "./Easings.js";

export class Tween {

	static #framerate;
	static #tickTimer;

	#currentFrame = 0;
	#startsFromFrame;
	#totalFrames;
	#lastFrame;
	#el;
	#propertiesKeysList;
	#startValues = {};
	#targetValues = {};
	#distances = {};
	#easingFunction;
	#onCompleteCallback;
	#isCompleted = false;

	static init(framerate = 120) {
		Tween.#framerate = framerate;
		Tween.#tickTimer = 1000 / Tween.#framerate;
	}

	get el() {
		return this.#el;
	}

	constructor(el, properties, easing = Easings.LINEAR, duration, delay = 0, onComplete=null) {
		this.#startsFromFrame = Math.round(delay / Tween.#tickTimer) || 1;
		this.#totalFrames = Math.round(duration / Tween.#tickTimer);
		this.#lastFrame = this.#startsFromFrame + this.#totalFrames - 1;
		this.#propertiesKeysList = Object.keys(properties);
		this.#el = el;
		this.#easingFunction = easing;
		this.#onCompleteCallback = onComplete;

		console.log("start from frame", this.#startsFromFrame);
		console.log("total frames", this.#totalFrames);
		console.log("last frame:", this.#lastFrame);

		this.#propertiesKeysList.forEach((key) => {
			this.#startValues[key] = el[key];
			this.#targetValues[key] = properties[key];
			this.#distances[key] = properties[key] - el[key];
		});
	}

	goToNextFrame() {
		if(this.#isCompleted) return;
		this.#currentFrame++;

		if(this.#currentFrame < this.#startsFromFrame) return;

		const position = this.#easingFunction((this.#currentFrame - this.#startsFromFrame) / this.#totalFrames);

		this.#propertiesKeysList.forEach((key) => {
			this.#el[key] = this.#startValues[key] + (this.#distances[key] * position);
		});

		if(this.#currentFrame === this.#lastFrame) {
			this.#isCompleted = true;
			this.#onCompleteCallback && this.#onCompleteCallback(this);
		}
	}

}