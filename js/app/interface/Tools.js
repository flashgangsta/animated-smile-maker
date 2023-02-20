import {CustomElement} from "./CustomElement.js";
import {PanelButton} from "./panels/PanelButton.js";

export class Tools extends CustomElement {
	constructor() {
		super();
		this.id = "tools";

		const buttonMove = new PanelButton("./assets/move-ico.png");
		const buttonHand = new PanelButton("./assets/hand-ico.png");

		this.append(buttonMove, buttonHand);
	}
}

customElements.define("tools-el", Tools);