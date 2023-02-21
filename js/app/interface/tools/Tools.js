import {CustomElement} from "../CustomElement.js";
import {ToolButton} from "./ToolButton.js";
import {Events} from "../../Events.js";

export class Tools extends CustomElement {

	static get TOOL_MOVE() { return "move"};
	static get TOOL_HAND() { return "hand"};

	constructor() {
		super();
		this.id = "tools";

		const buttonMove = new ToolButton("./assets/move-ico.png", Tools.TOOL_MOVE);
		const buttonHand = new ToolButton("./assets/hand-ico.png", Tools.TOOL_HAND);

		this.append(buttonMove, buttonHand);

		Array.from(this.children).forEach((button) => {
			button.addEventListener(Events.CLICK, (event) => this.#onToolSelect(event));
		});
	}


	#onToolSelect(event) {
		const button = event.target;
		this.#getSelectedTool()?.classList.remove("active");
		button.classList.add("active");
		this.dispatchEvent(new Event(Events.TOOL_SELECT));
	}


	#getSelectedTool() {
		return this.querySelector(".active");
	}


	get selectedToolName() {
		return this.#getSelectedTool()?.toolName || null;
	}
}

customElements.define("tools-el", Tools);