export class Body extends HTMLElement {
	constructor() {
		super();
		this.id = "body";
	}
}

customElements.define("body-el", Body);