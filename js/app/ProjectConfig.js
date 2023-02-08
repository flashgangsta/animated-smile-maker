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


	pushLibraryMedia(...files) {
		this.#library.push(...files);
		files.forEach((file) => {
			const url = URL.createObjectURL(file);
		});

		this.#lastImports = [...files];

		this.dispatchEvent(new Event("MEDIA_IMPORTED"));
	}


	get lastImports() {
		return this.#lastImports;
	}

}