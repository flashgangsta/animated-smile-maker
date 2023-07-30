import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";
import {ProjectConfig} from "../ProjectConfig.js";
import {Tools} from "./tools/Tools.js";
import {Events} from "../Events.js";

export class Body extends CustomElement {

	#canvas = document.createElement("canvas");
	#ctx = this.#canvas.getContext("2d");
	#projectConfig = new ProjectConfig();
	#handActive = false;
	#moveMouseStart = null;
	#ctxPosition = {};
	#scrollBorders = {};
	#scrollBorderSize = 50;

	constructor() {
		super();
		this.id = "body";

		this.listenEvents(
			new EventListener(window, Events.RESIZE, (event) => {this.#onWindowResize(event)}),
			new EventListener(this, Events.ADDED_TO_DOM, () => {this.#onAddedToDOM()}),
			new EventListener(window, Events.KEY_DOWN, (event) => {this.#onKeyDown(event)}),
			new EventListener(window, Events.KEY_UP, (event) => {this.#onKeyUp(event)}),
			new EventListener(window, Events.MOUSE_DOWN, (event) => {this.#onMouseDown(event)}),
			new EventListener(window, Events.MOUSE_UP, (event) => {this.#onMouseUp(event)}),
			new EventListener(window, Events.MOUSE_MOVE, (event) => {this.#onMouseMove(event)}),
			new EventListener(this, Events.WHEEL, (event) => {this.#onWheel(event)}, {passive: true})
		);

		this.append(this.#canvas);

	}


	#onAddedToDOM() {
		this.#onWindowResize();
		const canvasSize = this.#projectConfig.canvasSize;
		const centerX = this.width / 2;
		const centerY = this.height / 2;
		const width = canvasSize.width;
		const height = canvasSize.height;
		this.#ctxPosition = {
			x: Math.round(centerX - (width / 2)),
			y: Math.round(centerY - (height / 2)),
			width: canvasSize.width,
			height: canvasSize.height
		}
		this.#scrollBorders = {
			top: -this.#ctxPosition.height + this.#scrollBorderSize,
			left: -this.#ctxPosition.width + this.#scrollBorderSize,
			bottom: this.height - this.#scrollBorderSize,
			right: this.width - this.#scrollBorderSize
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

		this.#scrollBorders.bottom = this.height - this.#scrollBorderSize;
		this.#scrollBorders.right = this.width - this.#scrollBorderSize;

		this.#setBorders();
		this.#drawCtx();
	}


	#onKeyDown(event) {
		if(event.code === "Space" && !this.#handActive) {
			this.onToolSelect("hand");
		}
	}


	#onKeyUp(event) {
		if(event.code === "Space") {
			this.#canvas.classList.toggle("hand-active", false);
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
			const moveX = this.#moveMouseStart.x - event.clientX;
			const moveY = this.#moveMouseStart.y - event.clientY;
			this.#moveMouseStart.x = event.clientX;
			this.#moveMouseStart.y = event.clientY;
			this.#moveCanvas(moveX, moveY);
		}
	}


	#onWheel(event) {
		this.#moveCanvas(event.deltaX, event.deltaY);
	}


	#moveCanvas(x=0, y=0) {
		const ctxPosition = this.#ctxPosition;

		ctxPosition.x -= x;
		ctxPosition.y -= y;

		this.#setBorders();

		this.#drawCtx();
	}


	#setBorders() {
		const ctxPosition = this.#ctxPosition;
		const scrollBorders = this.#scrollBorders;

		if(ctxPosition.x < scrollBorders.left) {
			ctxPosition.x = scrollBorders.left;
		}

		if(ctxPosition.y < scrollBorders.top) {
			ctxPosition.y = scrollBorders.top;
		}

		if(ctxPosition.x > scrollBorders.right) {
			ctxPosition.x = scrollBorders.right;
		}

		if(ctxPosition.y > scrollBorders.bottom) {
			ctxPosition.y = scrollBorders.bottom;
		}
	}


	onToolSelect(toolName) {

		this.#handActive = false;
		this.#canvas.classList.toggle("hand-active", false);

		switch (toolName) {
			case Tools.TOOL_HAND: {
				this.#canvas.classList.toggle("hand-active", true);
				this.#handActive = true;
				break;
			}
		}
	}


	get width() {
		return this.#canvas.width;
	}


	get height() {
		return this.#canvas.height;
	}
}

customElements.define("body-el", Body);