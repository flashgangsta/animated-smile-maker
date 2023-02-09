import {CustomElement} from "./CustomElement.js";
import {MenuButton} from "./MenuButton.js";
import {MenuContext} from "./MenuContext.js";
import {MenuContextButton} from "./MenuContextButton.js";
import {FileManager} from "../utils/FileManager.js";
import {ProjectConfig} from "../ProjectConfig.js";

export class Menu extends CustomElement {

	#menuContent = {
		"File": {
			"New...": {},
			"Open": {},
			"Save": {},
			"Save As": {
				handler: () => this.#saveAs()
			},
			"Import": {
				handler: () => this.#importMedia()
			},
			"Export": {},
			"Exit": {}
		},
		"Edit": {
			"Undo": {},
			"Cut": {},
			"Copy": {},
			"Paste": {},
			"Clear": {},
			"Preferences": {},
		},
		"View": {
			"Zoom In": {},
			"Zoom Out": {},
		}
	}

	#activeContext;
	#fileManager = new FileManager();
	#projectConfig = new ProjectConfig();

	constructor() {
		super();
		this.id = "menu";

		Object.keys(this.#menuContent).forEach((label) => {
			this.append(new MenuButton(label));
		});

		this.addEventListener("click", (event) => this.#onClick(event));
		this.addEventListener("mouseover", (event) => this.#onMouseOver(event));
		window.addEventListener("blur", (event) => this.#onWindowBlur(event));
		window.addEventListener("mousedown", (event) => this.#onWindowMouseDown(event));
	}


	#onClick(event) {
		const target = event.target;
		if(target instanceof MenuContextButton) {
			this.#closeContext();
		}
		this.#openContext(event.target);
	}


	#onMouseOver(event) {
		if(this.#activeContext) {
			this.#openContext(event.target);
		}
	}


	#openContext(target) {
		const button = (target && target instanceof MenuButton) ? target : null;
		if(!button || this.#activeContext?.buttonLabel === button.label) return;
		const label = button.label;
		const contextData = this.#menuContent[label];
		this.#closeContext();
		this.#activeContext = new MenuContext(button, contextData);
		this.append(this.#activeContext);
	}


	#closeContext() {
		this.#activeContext?.remove();
		this.#activeContext = null;
	}


	#onWindowBlur(event) {
		this.#closeContext();
	}


	#onWindowMouseDown(event) {
		const target = event.target;
		if(!(target instanceof MenuButton) && !(target instanceof MenuContextButton)) {
			this.#closeContext();
		}
	}


	#importMedia() {
		this.#fileManager.openFile(FileManager.CONTENT_TYPE_IMAGES, true).then((files) => {
			this.#projectConfig.pushLibraryMedia(...files);
		});
	}


	#saveAs() {
		this.#fileManager.saveFile().then(() => {
			console.log("File Successfully Saved");
		});
	}
}

customElements.define("menu-el", Menu);