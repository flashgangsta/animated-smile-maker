export class FileManager {

	static instance;
	static get CONTENT_TYPE_IMAGES() {return "image/*"}

	#input = document.createElement("input");

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
				resolve(files);
			}
			input.click();
		})
	}

	async saveFile() {
		const filename = "animation";
		const fileExt = ".anmtr";
		const contents = "Hui nahui blyad";

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
			const saveFile = await window.showSaveFilePicker(options);

			if(await saveFile.queryPermission() === "granted") {
				const writable = await saveFile.createWritable();
				await writable.write(contents);
				await writable.close();
			}
		} else {
			//legacy
			const a = document.createElement("a");
			a.href = URL.createObjectURL(new Blob([contents], { type: 'text/plain' }));
			a.download = `${filename}${fileExt}`;
			a.click();
			URL.revokeObjectURL(a.href);
			a.remove();
		}

		return true;
	}

}