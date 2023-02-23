import {TimelineKeyFrame} from "./TimelineKeyFrame.js";
import {CustomElement} from "../CustomElement.js";
import {EventListener} from "../../models/EventListener.js";
import {Events} from "../../Events.js";
import {TimelineContextMenu} from "./TimelineContextMenu.js";

export class TimelineTrackLayer extends CustomElement {

	#frameWidth = 12;
	#contextMenu = null;
	#menuContent = {
		"Create Tween": {},
		"Insert Frame": {
			handler: () => this.#insertFrame()
		},
		"Remove Frames": {},
		"Insert Keyframe": {
			handler: () => this.#insertKeyframe()
		},
		"Insert Blank Keyframe": {
			handler: () => this.#insertBlankKeyframe()
		},
		"Clear Keyframe": {},
		"Convert to Keyframes": {},
		"Convert to Blank Keyframes": {},
		"Cut Frames": {},
		"Copy Frames": {},
		"Paste Frames": {},
		"Paste and Overwrite Frames": {},
		"Clear Frames": {},
		"Select All Frames": {},
	}

	constructor() {
		super();
		this.classList.add("timeline-track-layer");
		this.append(new TimelineKeyFrame());

		this.listenEvents(
			new EventListener(this, Events.CONTEXT_MENU, (event) => this.#onRightClick(event))
		);
	}


	#onRightClick(event) {
		event.preventDefault();
		const rect = this.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const frameNum = Math.floor(x / this.#frameWidth) + 1;
		console.log("frame N:", frameNum);

		this.#closeContext();
		this.#contextMenu = new TimelineContextMenu(x, this.#menuContent, () => this.#closeContext());
		this.dispatchEvent(new Event(Events.TIMELINE_CONTEXT_CALL, {bubbles: true}));

		return false;
	}


	#closeContext() {
		this.#contextMenu?.remove();
		this.#contextMenu = null;
	}


	#insertFrame() {

	}


	#insertKeyframe() {

	}


	#insertBlankKeyframe() {

	}


	get contextMenu() {
		return this.#contextMenu;
	}
}

customElements.define("timeline-track-layer", TimelineTrackLayer);