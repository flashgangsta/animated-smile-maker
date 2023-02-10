import {Timeline} from "./timeline/Timeline.js";
import {Library} from "./library/Library.js";
import {Menu} from "./menu/Menu.js";
import {Tools} from "./Tools.js";
import {Body} from "./Body.js";

export class Interface extends HTMLElement {

	constructor() {
		super();
		this.id = "interface"

		const topContainer = document.createElement("div");
		const midContainer = document.createElement("div");
		const leftContainer = document.createElement("div");
		const centerContainer = document.createElement("div");
		const rightContainer = document.createElement("div");

		midContainer.classList.add("mid-container");
		midContainer.append(leftContainer, centerContainer, rightContainer);

		centerContainer.classList.add("center-container");

		this.append(topContainer, midContainer);

		topContainer.append(new Menu());
		leftContainer.append(new Tools());
		rightContainer.append(new Library());
		centerContainer.append(new Body(), new Timeline());

	}
}

customElements.define("interface-el", Interface);