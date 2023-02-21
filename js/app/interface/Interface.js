import {Timeline} from "./timeline/Timeline.js";
import {Library} from "./library/Library.js";
import {Menu} from "./menu/Menu.js";
import {Tools} from "./tools/Tools.js";
import {Body} from "./Body.js";
import {Container} from "./Container.js";
import {CustomElement} from "./CustomElement.js";
import {EventListener} from "../models/EventListener.js";

export class Interface extends CustomElement {

	constructor() {
		super();
		this.id = "interface"

		const handler = () => {
			this.#addedToDOM();
			this.stopListenEvent("ADDED_TO_DOM", handler);
		}

		this.listenEvents(
			new EventListener(this, "ADDED_TO_DOM", handler),
		);
	}


	#addedToDOM() {
		const topContainer = new Container();
		const midContainer = new Container();
		const leftContainer = new Container();
		const centerContainer = new Container();
		const rightContainer = new Container();
		const menu = new Menu();
		const tools = new Tools();
		const body = new Body();

		midContainer.classList.add("mid-container");
		midContainer.append(leftContainer, centerContainer, rightContainer);

		centerContainer.classList.add("center-container");

		this.append(topContainer, midContainer);

		topContainer.append(menu);
		leftContainer.append(tools);
		rightContainer.append(new Library());
		centerContainer.append(body, new Timeline());

		tools.addEventListener("TOOL_SELECT", (event) => {
			body.onToolSelect(tools.selectedToolName);
		});
	}
}

customElements.define("interface-el", Interface);