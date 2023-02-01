export class PanelButton extends HTMLButtonElement {
	constructor(iconPath) {
		super();

		this.classList.add("panel-button");
		const icon = new Image();
		icon.src = iconPath;
		this.append(icon);
	}
}

customElements.define("panel-button", PanelButton, {extends: "button"});