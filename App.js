import {Bitmap} from "./Bitmap.js";
import {Tween} from "./Tween.js";
import {Easing} from "./Easing.js";

export class App {

	#currentFrame = 0;
	#framerate = 60;
	#maxFrames = 60;
	#drawInterval = null;
	#drawIntervalTimeout = 1000 / this.#framerate;
	#sizePreview = 600;
	#sizeBig = 112;
	#sizeMid = 56;
	#sizeSmall = 28;

	#canvas = document.createElement("canvas");
	#canvasBig = document.createElement("canvas");
	#canvasMid = document.createElement("canvas");
	#canvasSmall = document.createElement("canvas");
	#context = this.#canvas.getContext("2d");
	#contextBig = this.#canvasBig.getContext("2d");
	#contextMid = this.#canvasMid.getContext("2d");
	#contextSmall = this.#canvasSmall.getContext("2d");
	#body = document.body;

	#meBitmap;
	#imagePaths = ["me.png", "hand.png"];
	#handBitmap;

	#tweenList = [];

	constructor() {
		Tween.init(this.#framerate);

		this.#canvas.width = this.#canvas.height = this.#sizePreview;
		this.#canvasBig.width = this.#canvasBig.height = this.#sizeBig;
		this.#canvasMid.width = this.#canvasMid.height = this.#sizeMid;
		this.#canvasSmall.width = this.#canvasSmall.height = this.#sizeSmall;

		this.#body.append(this.#canvas);
		this.#body.append(this.#canvasBig);
		this.#body.append(this.#canvasMid);
		this.#body.append(this.#canvasSmall);

		this.#context.fillStyle = "transparent";
		this.#contextBig.fillStyle = "transparent";
		this.#contextMid.fillStyle = "transparent";
		this.#contextSmall.fillStyle = "transparent";

		this.#context.imageSmoothingEnabled = true;
		this.#context.imageSmoothingQuality = "high";
		this.#contextBig.imageSmoothingEnabled = true;
		this.#contextBig.imageSmoothingQuality = "high";
		this.#contextMid.imageSmoothingEnabled = true;
		this.#contextMid.imageSmoothingQuality = "high";
		this.#contextSmall.imageSmoothingEnabled = true;
		this.#contextSmall.imageSmoothingQuality = "high";

		this.#context.save();
		this.#contextBig.save();
		this.#contextMid.save();
		this.#contextSmall.save();

		this.#context.fillRect(0, 0, this.#sizePreview, this.#sizePreview);

		this.#updatePreviews();

		this.#loadImages();

	}


	#loadImages() {
		const bitmapsListByName = {};
		const total = this.#imagePaths.length;
		let loaded = 0;
		this.#imagePaths.forEach((path) => {
			const img = new Image();
			img.onload = (event) => {
				const bitmap = new Bitmap(event.target);
				bitmap.name = path.substring(0, path.indexOf("."));
				bitmapsListByName[bitmap.name] = bitmap;
				if(++loaded === total) {
					this.#meBitmap = bitmapsListByName["me"];
					this.#handBitmap = bitmapsListByName["hand"];
					this.#onImagesLoaded();
				}
			}
			img.src = path;
		});
	}

	#onImagesLoaded(event) {
		window.me = this.#meBitmap;
		this.#startAnimation();
	}


	#updatePreviews() {
		this.#contextBig.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextMid.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextSmall.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextBig.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeBig, this.#sizeBig);
		this.#contextMid.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeMid, this.#sizeMid);
		this.#contextSmall.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeSmall, this.#sizeSmall);
	}

	#startAnimation() {
		this.#meBitmap.x = -75;
		this.#meBitmap.y = this.#sizePreview;
		this.#handBitmap.x = -450;
		this.#handBitmap.y = this.#sizePreview / 2;

		//const onComplete = (tween) => this.#tweenList.splice(this.#tweenList.indexOf(tween), 1);

		let dur = 300;
		let del = 200;

		const getDelay = () => dur;

		this.#tweenList.push(
			new Tween(this.#meBitmap, {y: 0}, Easing.OUT_BACK, 300),
			new Tween(this.#meBitmap, {y: this.#sizePreview}, Easing.IN_BACK, 300, 650),
			new Tween(this.#handBitmap, {x: 170, y: 90, rotation: 45}, Easing.OUT_CIRC, 250),
			new Tween(this.#handBitmap, {x: 0, rotation: 0}, Easing.IN_OUT_CIRC, 200, 250),
			new Tween(this.#handBitmap, {x: 170, rotation: 45}, Easing.IN_OUT_CIRC, 200, 450),
			new Tween(this.#handBitmap, {x: -450, y: this.#sizePreview / 2, rotation: 0}, Easing.IN_CIRC, 200, 650),

			//new Tween(this.#meBitmap, {rotation: 35}, Easing.OUT_CUBIC, 150, 150),

			//new Tween(this.#handBitmap, {x: 0, y: 100, rotation: 0}, Easing.IN_OUT_CUBIC, 125, 450),
			//new Tween(this.#handBitmap, {x: 170, y: 20, rotation: 20}, Easing.IN_OUT_CUBIC, 125, 575),
			//new Tween(this.#handBitmap, {x: 0, y: 100, rotation: 0}, Easing.IN_OUT_CUBIC, 125, 700),
		)

		//document.addEventListener("keydown", (e) => e.key === "." && this.#tick());
		this.#drawInterval = setInterval(() => this.#tick(), this.#drawIntervalTimeout);
		this.#tick();

		window.hand = this.#handBitmap;
	}


	#tick() {
		this.#currentFrame++;
		this.#draw();
	}


	#draw() {
		console.log(`draw frame #${this.#currentFrame}`);
		const tweenList = this.#tweenList;
		const context = this.#context;
		let completedCount = 0;

		if(tweenList.length) {
			context.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		} else {
			//console.log("no animations in queue");
			return;
		}

		for (let i = 0, len = tweenList.length; i < len; i++) {
			const tween = tweenList[i];
			const el = tween.el;

			tween.goToNextFrame();

			if(tween.isComplete) completedCount++;

			if(this.#isSameElExistsAfter(i, len, el)) {
				continue;
			}

			const image = tween.el.image;
			context.save();

			const cX = el.width / 2;
			const cY = el.height / 2;
			context.translate(el.x + cX, el.y + cY);
			context.rotate(el.rotation * Math.PI / 180);
			context.translate(-el.x - cX, -el.y - cY);
			context.drawImage(image, el.x, el.y);
			context.restore();
		}

		this.#updatePreviews();

		if(this.#currentFrame === this.#maxFrames || completedCount === tweenList.length) {
			clearInterval(this.#drawInterval);
			this.#drawInterval = null;
		}
	}


	#isSameElExistsAfter(i, len, el) {
		const tweenList = this.#tweenList;
		if(i < len - 1) {
			for (let k = i + 1; k < len; k++) {
				const nextTween = tweenList[k];
				if (nextTween.el === el) {
					return true;
				}
			}
		}
		return false;
	}

}

new App();