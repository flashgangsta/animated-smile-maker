import {Bitmap} from "./Bitmap.js";
import {Tween} from "./Tween.js";
import {Easings} from "./Easings.js";

export class App {

	#currentFrame = 0;
	#framerate = 100;
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

	#animations = [];

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
		this.#context.imageSmoothingEnabled = true;
		this.#context.imageSmoothingQuality = "high";
		this.#context.save();
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
		this.#meBitmap.y = this.#sizePreview;

		this.#animations.push(
			new Tween(this.#meBitmap, {y: 0}, Easings.EASE_OUT_BACK, 500, (tween) => {
				this.#animations.splice(this.#animations.indexOf(tween), 1);
				console.log("Tween Completed");
			})
		)

		this.#drawInterval = setInterval(() => this.#tick(), this.#drawIntervalTimeout);
		this.#tick();
	}


	#tick() {
		this.#currentFrame++;
		this.#draw();
	}


	#draw() {
		if(this.#animations.length) {
			this.#context.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		} else {
			//console.log("no animations in queue");
			return;
		}

		for(let i = 0; i < this.#animations.length; i++) {
			const tween = this.#animations[i];
			tween.goToNextFrame();

			if(tween.el instanceof Bitmap) {
				const el = tween.el;
				const image = tween.el.image;
				this.#context.drawImage(image, el.x, el.y);
			}
		}

		this.#updatePreviews();

		if(this.#currentFrame === this.#maxFrames) {
			clearInterval(this.#drawInterval);
			this.#drawInterval = null;
		}
	}

}

new App();