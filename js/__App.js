import {Bitmap} from "./display/Bitmap.js";
import {Tween} from "./transitions/Tween.js";
import {Easing} from "./transitions/Easing.js";

export class __App {

	#currentFrame = 0;
	#framerate = 60;
	#maxFrames = 60;
	#drawInterval = null;
	#drawIntervalTimeout = 1000 / this.#framerate;
	#saveIntervalTimeout = 1000;
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
	#buttonSave = null;
	#buttonPlay = null;
	#buttonPause = null;
	#buttonStop = null;
	#isSaveToggle = false;
	#saveConfig = [
		{name: "preview", canvas: this.#canvas},
		{name: "big", canvas: this.#canvasBig},
		{name: "mid", canvas: this.#canvasMid},
		{name: "small", canvas: this.#canvasSmall},
	];

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

		this.#buttonSave = this.#body.querySelector("#button_save");
		this.#buttonPlay = this.#body.querySelector("#button_play");
		this.#buttonPause = this.#body.querySelector("#button_pause");
		this.#buttonStop = this.#body.querySelector("#button_stop");

		this.#buttonSave.addEventListener("click", (event) => this.#onButtonSaveClick(event));
		this.#buttonPlay.addEventListener("click", (event) => this.#play());
		this.#buttonPause.addEventListener("click", (event) => this.#pause());
		this.#buttonStop.addEventListener("click", (event) => this.#stop());

		document.addEventListener("keydown", (event) => {
			if(this.#isSaveToggle) {
				return;
			}

			switch (event.key) {
				case ".":
					this.#tick();
					break;
				case ",":
					if(this.#currentFrame > 1) {
						this.#currentFrame -= 2;
						this.#tick();
					}
					break;
			}
		});


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
		this.#prepareElements();
		this.#createTweenList();
		this.#tick();
	}


	#updatePreviews() {
		this.#contextBig.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextMid.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextSmall.clearRect(0, 0, this.#sizePreview, this.#sizePreview);
		this.#contextBig.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeBig, this.#sizeBig);
		this.#contextMid.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeMid, this.#sizeMid);
		this.#contextSmall.drawImage(this.#canvas, 0, 0, this.#sizePreview, this.#sizePreview, 0, 0, this.#sizeSmall, this.#sizeSmall);
	}

	#createTweenList() {
		this.#tweenList.push(
			new Tween(this.#meBitmap, {y: 0}, Easing.OUT_BACK, 300),
			new Tween(this.#meBitmap, {y: this.#sizePreview}, Easing.IN_BACK, 300, 650),
			new Tween(this.#handBitmap, {x: 170, y: 90, rotation: 45}, Easing.OUT_CIRC, 250),
			new Tween(this.#handBitmap, {x: 0, rotation: 0}, Easing.IN_OUT_CIRC, 200, 250),
			new Tween(this.#handBitmap, {x: 170, rotation: 45}, Easing.IN_OUT_CIRC, 200, 450),
			new Tween(this.#handBitmap, {x: -450, y: this.#sizePreview / 2, rotation: 0}, Easing.IN_CIRC, 200, 650),
		)
	}


	#prepareElements() {
		this.#meBitmap.x = -75;
		this.#meBitmap.y = this.#sizePreview;
		this.#handBitmap.x = -450;
		this.#handBitmap.y = this.#sizePreview / 2;
		this.#meBitmap.rotation = 0;
		this.#handBitmap.rotation = 0;
	}


	#play() {
		if(!this.#drawInterval) {
			const timeout = this.#isSaveToggle ? this.#saveIntervalTimeout : this.#drawIntervalTimeout;
			this.#drawInterval = setInterval(() => this.#tick(), timeout);
		}

		this.#buttonPlay.disabled = true;
		this.#buttonStop.disabled = false;
		this.#buttonPause.disabled = false;
	}


	#stop() {
		this.#isSaveToggle = false;
		this.#pause();
		this.#currentFrame = 0;
		this.#tweenList.forEach((tween) => tween.reset());
		this.#prepareElements();
		this.#tick();

		this.#buttonSave.disabled = false;
		this.#buttonStop.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonPlay.disabled = false;
	}


	#pause() {
		clearInterval(this.#drawInterval);
		this.#drawInterval = null;
		this.#buttonPause.disabled = true;
		this.#buttonPlay.disabled = false;
	}


	#tick() {
		if(this.#isSaveToggle) {
			this.#savePictures();
		}

		this.#currentFrame++;
		this.#draw();
	}


	#draw() {
		console.log(`draw frame #${this.#currentFrame}`);
		const tweenList = this.#tweenList;
		const context = this.#context;
		let completedCount = 0;

		context.clearRect(0, 0, this.#sizePreview, this.#sizePreview);

		const currentFrame = this.#currentFrame;

		for (let i = 0, len = tweenList.length; i < len; i++) {
			const tween = tweenList[i];
			const el = tween.el;

			tween.goToFrame(currentFrame);

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

		if(currentFrame === this.#maxFrames || completedCount === tweenList.length) {
			this.#onAnimationsComplete();
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


	#onAnimationsComplete() {
		this.#stop();

	}

	#onButtonSaveClick(event) {
		this.#stop();
		this.#isSaveToggle = true;

		this.#play();

		this.#buttonSave.disabled = true;
		this.#buttonPlay.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonStop.disabled = true;
	}


	#savePictures() {
		const link = document.createElement("a");

		this.#saveConfig.forEach((el) => {
			const canvas = el.canvas;
			const name = el.name;
			link.download = `${name}_frame_${this.#currentFrame}.png`;
			link.href = canvas.toDataURL();
			link.click();
		});

		link.remove();
	}
}

new __App();