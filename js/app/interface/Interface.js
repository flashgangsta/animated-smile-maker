import {Timeline} from "./Timeline.js";

export class Interface extends HTMLElement {

	constructor() {
		super();
		this.id = "interface"
		this.append(new Timeline());
	}
}

customElements.define("interface-el", Interface);