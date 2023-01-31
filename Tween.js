import {Easing} from "./Easing.js";

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
	#isComplete = false;
	#isInit = false;

	constructor(el, properties, easing = Easing.LINEAR, duration, delay = 0, onComplete=null) {
		this.#startsFromFrame = Math.round(delay / Tween.#tickTimer) || 1;
		this.#totalFrames = Math.round(duration / Tween.#tickTimer) || 1;
		this.#lastFrame = this.#startsFromFrame + this.#totalFrames;
		this.#propertiesKeysList = Object.keys(properties);
		this.#el = el;
		this.#easingFunction = easing;
		this.#onCompleteCallback = onComplete;
		this.#properties = properties;
	}

	static init(framerate = 120) {
		Tween.#framerate = framerate;
		Tween.#tickTimer = 1000 / Tween.#framerate;
	}

	get el() {
		return this.#el;
	}


	get isComplete() {
		return this.#isComplete;
	}


	reset() {
		this.#isComplete = false;
		this.#currentFrame = 0;
	}

	goToFrame(frameNum) {
		if(frameNum < 1) frameNum = 1;
		this.#currentFrame = frameNum;
		this.#setProperties();
	}


	#setProperties() {
		//if(this.#isComplete) return;
		if(this.#currentFrame < this.#startsFromFrame) {
			//wait delay
			return;
		} else if(!this.#isInit && this.#currentFrame === this.#startsFromFrame) {
			//starts animation
			this.#propertiesKeysList.forEach((key) => {
				this.#startValues[key] = this.#el[key];
				this.#targetValues[key] = this.#properties[key];
				this.#distances[key] = this.#properties[key] - this.#el[key];
			});
			this.#isInit = true;
		}

		const el = this.#el;
		const position = this.#isComplete ? 1 : this.#easingFunction((this.#currentFrame - this.#startsFromFrame) / this.#totalFrames);

		this.#propertiesKeysList.forEach((key) => {
			el[key] = this.#isComplete ? el[key] : this.#startValues[key] + (this.#distances[key] * position);
		});

		if(this.#currentFrame === this.#lastFrame) {
			this.#isComplete = true;
			this.#onCompleteCallback && this.#onCompleteCallback(this);
		}
	}

}