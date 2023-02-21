import {MenuButton} from "./MenuButton.js";
import {MenuContext} from "./MenuContext.js";
import {MenuContextButton} from "./MenuContextButton.js";
import {CustomElement} from "../CustomElement.js";
import {FileManager} from "../../utils/FileManager.js";
import {ProjectConfig} from "../../ProjectConfig.js";
import {MediaFile} from "../../models/MediaFile.js";
import {Events} from "../../Events.js";

export class Menu extends CustomElement {

	#menuContent = {
		"File": {
			"New...": {},
			"Open": {
				handler: () => this.#openProject()
			},
			"Save": {
				handler: () => this.#saveProject(),
				disabled: true
			},
			"Save As": {
				handler: () => this.#saveProjectAs()
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

		this.addEventListener(Events.CLICK, (event) => this.#onClick(event));
		this.addEventListener(Events.MOUSE_OVER, (event) => this.#onMouseOver(event));
		window.addEventListener(Events.BLUR, (event) => this.#onWindowBlur(event));
		window.addEventListener(Events.MOUSE_DOWN, (event) => this.#onWindowMouseDown(event));
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
		this.#fileManager.openFile(FileManager.CONTENT_TYPE_IMAGES, true).then(async (files) => {
			//todo: check duplicates

			const mediaFiles = [];

			for(let i = 0, len = files.length; i < len; i++) {
				const file = files[i];
				const base64 = await this.#fileManager.fileToBase64(file);
				const mediaFile = new MediaFile(file.name, file.type, base64);
				mediaFiles.push(mediaFile);
			}

			this.#projectConfig.pushLibraryMedia(...mediaFiles);
		});
	}


	#saveProject() {
		this.#fileManager.saveProject().then(() => {
			console.log(`Project file ${this.#projectConfig.projectName} successfully saved.`);
		});
	}


	#saveProjectAs() {
		this.#fileManager.saveProjectAs().then((a) => {
			console.log(`Project file successfully Saved As ${this.#projectConfig.projectName}`);
			this.#enableSaveButton();
		});
	}


	#openProject() {
		this.#fileManager.openProject().then((file) => {
			this.#fileManager.readFile(file).then((result) => {
				this.#projectConfig.loadProject(JSON.parse(String(result)));
				this.#enableSaveButton();
			});
		});
	}


	#enableSaveButton() {
		this.#menuContent.File.Save.disabled = false;
	}
}

customElements.define("menu-el", Menu);