import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";
import {ProjectConfig} from "../ProjectConfig.js";

export class Body extends CustomElement {

	#canvas = document.createElement("canvas");
	#ctx = this.#canvas.getContext("2d");
	#projectConfig = new ProjectConfig();
	#handActive = false;
	#moveMouseStart = null;
	#ctxPosition = {};

	constructor() {
		super();
		this.id = "body";

		this.listenEvents(
			new EventListener(window, "resize", (event) => {this.#onWindowResize(event)}),
			new EventListener(this, "ADDED_TO_DOM", () => {this.#onAddedToDOM()}),
			new EventListener(window, "keydown", (event) => {this.#onKeyDown(event)}),
			new EventListener(window, "keyup", (event) => {this.#onKeyUp(event)}),
			new EventListener(window, "mousedown", (event) => {this.#onMouseDown(event)}),
			new EventListener(window, "mouseup", (event) => {this.#onMouseUp(event)}),
			new EventListener(window, "mousemove", (event) => {this.#onMouseMove(event)}),
		);

		this.append(this.#canvas);

	}


	#onAddedToDOM() {
		this.#onWindowResize();
		const canvasSize = this.#projectConfig.canvasSize;
		const centerX = this.#canvas.width / 2;
		const centerY = this.#canvas.height / 2;
		const width = canvasSize.width;
		const height = canvasSize.height;
		this.#ctxPosition = {
			x: Math.round(centerX - (width / 2)),
			y: Math.round(centerY - (height / 2)),
			width: canvasSize.width,
			height: canvasSize.height
		}

		this.#drawCtx();
	}


	#drawCtx() {
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		this.#ctx.fillStyle = "white";
		this.#ctx.fillRect(this.#ctxPosition.x, this.#ctxPosition.y, this.#ctxPosition.width, this.#ctxPosition.height);
	}


	#onWindowResize(event=null) {
		this.#canvas.width = this.offsetWidth;
		this.#canvas.height = this.offsetHeight;
	}


	#onKeyDown(event) {
		if(event.code === "Space") {
			this.#canvas.classList.add("hand-active");
			this.#handActive = true;
		}
	}


	#onKeyUp(event) {
		if(event.code === "Space") {
			this.#canvas.classList.remove("hand-active");
			this.#handActive = false;
		}
	}

	#onMouseDown(event) {
		if(this.#handActive) {
			this.#moveMouseStart = {
				x: event.clientX,
				y: event.clientY
			}
		}
	}


	#onMouseUp(event) {
		this.#moveMouseStart = null;
	}


	#onMouseMove(event) {
		if(this.#handActive && this.#moveMouseStart) {
			const moveX = event.clientX - this.#moveMouseStart.x;
			const moveY = event.clientY - this.#moveMouseStart.y;
			this.#ctxPosition.x += moveX;
			this.#ctxPosition.y += moveY;
			this.#moveMouseStart.x = event.clientX;
			this.#moveMouseStart.y = event.clientY;
			this.#drawCtx();
		}
	}
}

customElements.define("body-el", Body);