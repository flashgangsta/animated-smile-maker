import {Easings} from "./Easings.js";

export class Tween {

	static #framerate;
	static #tickTimer;
	static #context;

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

	static init(context = null, framerate = 120) {
		Tween.#context = context;
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

		//console.log("start from frame", this.#startsFromFrame);
		//console.log("total frames", this.#totalFrames);
		//console.log("last frame:", this.#lastFrame);

		this.#propertiesKeysList.forEach((key) => {
			this.#startValues[key] = el[key];
			this.#targetValues[key] = properties[key];
			this.#distances[key] = properties[key] - el[key];
		});
	}

	goToNextFrame() {
		//if(this.#isCompleted) return;
		this.#currentFrame++;

		if(this.#currentFrame < this.#startsFromFrame) return;

		const context = Tween.#context;
		const el = this.#el;
		const position = this.#isCompleted ? 1 : this.#easingFunction((this.#currentFrame - this.#startsFromFrame) / this.#totalFrames);

		this.#propertiesKeysList.forEach((key) => {
			const value = this.#isCompleted ? el[key] : this.#startValues[key] + (this.#distances[key] * position);

			switch (key) {
				case "rotation":
					const cX = el.width / 2;
					const cY = el.height / 2;
					el.rotation = value;
					context.translate(el.x + cX, el.y + cY);
					context.rotate(value * Math.PI / 180);
					context.translate(-el.x - cX, -el.y - cY);
					break;
				default:
					el[key] = value;
			}
		});

		if(this.#currentFrame === this.#lastFrame) {
			this.#isCompleted = true;
			this.#onCompleteCallback && this.#onCompleteCallback(this);
		}
	}

}