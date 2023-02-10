import {MediaFile} from "./models/MediaFile.js";

export class ProjectConfig extends EventTarget {
	static instance;

	#library = [];
	#lastImports;

	constructor() {
		if (!ProjectConfig.instance) {
			super();
			ProjectConfig.instance = this;
		}

		return ProjectConfig.instance;
	}


	static getInstance() {
		return new ProjectConfig();
	}


	loadProject(config) {
		const library = config.library;
		if(library && library.length) {
			const mediaFilesList = library.map((fileModel) => {
				const mediaFile = new MediaFile();
				mediaFile.write(fileModel);
				return mediaFile;
			});

			this.pushLibraryMedia(...mediaFilesList);
		}
	}


	pushLibraryMedia(...mediaFiles) {
		this.#library.push(...mediaFiles);
		this.#lastImports = [...mediaFiles];
		this.dispatchEvent(new Event("MEDIA_IMPORTED"));
	}


	removeLibraryMedia(mediaFile) {
		const index = this.#library.findIndex((el) => el.name === mediaFile.name);
		this.#library.splice(index, 1);
		console.log(this.#library);
	}


	get lastImports() {
		return this.#lastImports;
	}


	toString() {
		return JSON.stringify({
			library: this.#library.map(el => el.serializeObject())
		});
	}

}