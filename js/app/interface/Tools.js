export class Tools extends HTMLElement {
	constructor() {
		super();
		this.id = "tools";
	}
}

customElements.define("tools-el", Tools);