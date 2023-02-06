export class PanelButton extends HTMLElement {

	#disabled = false;

	constructor(iconPath) {
		super();

		this.classList.add("panel-button", "button");
		const icon = new Image();
		icon.src = iconPath;
		this.append(icon);
	}


	get disabled() {
		return this.#disabled;
	}

	set disabled(value) {
		this.#disabled = !!value;
		if(this.#disabled) {
			this.setAttribute("disabled", "true");
		} else {
			this.removeAttribute("disabled");
		}
	}
}

customElements.define("panel-button", PanelButton);