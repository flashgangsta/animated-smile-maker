import {Easings} from "./Easings.js";

export class Tween {

	static #framerate;
	static #tickTimer;

	#currentFrame = 0;
	#startsFromFrame;
	#totalFrames;
	#lastFrame;
	#el;
	#properties;
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
		this.#properties = properties;

		//console.log("start from frame", this.#startsFromFrame);
		//console.log("total frames", this.#totalFrames);
		//console.log("last frame:", this.#lastFrame);
	}

	goToNextFrame() {
		//if(this.#isCompleted) return;
		this.#currentFrame++;

		if(this.#currentFrame < this.#startsFromFrame) {
			//wait delay
			return;
		} else if(this.#currentFrame === this.#startsFromFrame) {
			//starts animation
			this.#propertiesKeysList.forEach((key) => {
				this.#startValues[key] = this.#el[key];
				this.#targetValues[key] = this.#properties[key];
				this.#distances[key] = this.#properties[key] - this.#el[key];
			});
		}

		const el = this.#el;
		const position = this.#isCompleted ? 1 : this.#easingFunction((this.#currentFrame - this.#startsFromFrame) / this.#totalFrames);

		this.#propertiesKeysList.forEach((key) => {
			const value = this.#isCompleted ? el[key] : this.#startValues[key] + (this.#distances[key] * position);
			el[key] = value;
		});

		if(this.#currentFrame === this.#lastFrame) {
			this.#isCompleted = true;
			this.#onCompleteCallback && this.#onCompleteCallback(this);
		}
	}

}