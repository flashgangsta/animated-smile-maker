import {ProjectConfig} from "../ProjectConfig.js";

export class FileManager {

	static instance;
	static get CONTENT_TYPE_IMAGES() {return "image/*"}

	#projectConfig = new ProjectConfig();
	#fileExt = ".anmtr";
	#input = document.createElement("input");
	#projectFile;

	constructor() {
		if(!FileManager.instance) {
			FileManager.instance = this;
			this.#input.type = "file";
		}

		return FileManager.instance;
	}

	static getInstance() {
		return new FileManager();
	}


	openFile(contentType = null, multiple = false) {
		const input = this.#input;
		contentType ? input.accept = contentType : input.removeAttribute("accept");
		multiple ? input.setAttribute("multiple", "") : input.removeAttribute("multiple");

		return new Promise(resolve => {
			input.onchange = () => {
				let files = Array.from(input.files);
				input.onchange = null;
				resolve(multiple ? files : files[0]);
			}
			input.click();
		})
	}


	async openProject() {
		const [fileHandle] = await window.showOpenFilePicker({
			types: [{
				description: "Animator file",
				accept: {'text/plain': [this.#fileExt]}
			}],
			excludeAcceptAllOption: true,
			multiple: false,
		});

		this.#projectFile = fileHandle;

		const file = await fileHandle.getFile();
		return file;
	}


	async saveProjectAs() {
		const filename = this.#projectConfig.projectName || "Untitled";
		const fileExt = this.#fileExt;

		if(window.showSaveFilePicker) {
			//FileSystem API
			//https://fjolt.com/article/javascript-new-file-system-api
			const options = {
				suggestedName: filename,
				types: [{
					description: "Animator file",
					accept: {'text/plain': [fileExt]},
				}]
			}
			const saveFile = this.#projectFile = await window.showSaveFilePicker(options);
			this.#projectConfig.projectName = saveFile.name.slice(0, -(fileExt.length));

			await this.saveProject();
		} else {
			//legacy
			const a = document.createElement("a");
			a.href = URL.createObjectURL(new Blob([this.#projectConfig.toString()], { type: 'text/plain' }));
			a.download = `${filename}${fileExt}`;
			a.click();
			URL.revokeObjectURL(a.href);
			a.remove();
		}
	}


	async saveProject() {
		if(await this.#projectFile.queryPermission() === "granted") {
			const writable = await this.#projectFile.createWritable();
			await writable.write(this.#projectConfig.toString());
			await writable.close();
		}
	}


	fileToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = this.#initFileReader(resolve, reject);
			reader.readAsDataURL(file);
		});
	}


	readFile(file) {
		return new Promise((resolve, reject) => {
			const reader = this.#initFileReader(resolve, reject);
			reader.readAsText(file);
		});
	}


	#initFileReader(resolve, reject) {
		const fileReader = new FileReader();
		fileReader.onload = (event) => {
			resolve(fileReader.result);
		}

		fileReader.onerror = (error) => {
			reject(error);
		}

		fileReader.onloadend = (event) => {
			fileReader.onloadend = null;
			fileReader.onload = null;
			fileReader.onerror = null;
		}

		return fileReader;
	}

}