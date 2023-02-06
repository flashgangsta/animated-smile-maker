export class Menu extends HTMLElement {
	constructor() {
		super();
		this.id = "menu";
	}
}

customElements.define("menu-el", Menu)