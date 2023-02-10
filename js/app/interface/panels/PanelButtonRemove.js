import {PanelButton} from "./PanelButton.js";

export class PanelButtonRemove extends PanelButton {
	constructor() {
		super("./assets/remove-layer-ico.png");
	}
}

customElements.define("panel-button-remove", PanelButtonRemove);