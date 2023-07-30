import {PanelButton} from "../panels/PanelButton.js";

export class ToolButton extends PanelButton {

	#toolName;

	constructor(iconPath, toolName) {
		super(iconPath);
		this.#toolName = toolName;
	}


	get toolName() {
		return this.#toolName;
	}
}

customElements.define("tool-button-el", ToolButton);