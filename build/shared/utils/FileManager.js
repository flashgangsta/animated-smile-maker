import { ProjectConfig } from "./ProjectConfig.js";
export class FileManager extends EventTarget {
    static instance;
    static CONTENT_TYPE_IMAGES = "image/*";
    input = document.createElement("input");
    projectConfig = ProjectConfig.getInstance();
    projectFile;
    constructor() {
        super();
        this.input.type = "file";
    }
    static getInstance() {
        if (!FileManager.instance) {
            FileManager.instance = new FileManager();
        }
        return FileManager.instance;
    }
    openFiles(contentType = FileManager.CONTENT_TYPE_IMAGES, multiple = false) {
        const input = this.input;
        contentType ? input.accept = contentType : input.removeAttribute("accept");
        input.multiple = multiple;
        return new Promise(resolve => {
            input.onchange = () => {
                let files = input.files ? Array.from(input.files) : [];
                input.onchange = null;
                resolve(files);
            };
            input.click();
        });
    }
    async openProject() {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                    description: "Animator file",
                    accept: { 'text/plain': [this.projectConfig.fileExt] }
                }],
            excludeAcceptAllOption: true,
            multiple: false,
        });
        this.projectFile = fileHandle;
        return await fileHandle.getFile();
    }
    async saveProject() {
        if (this.projectFile) {
            if (await this.projectFile.queryPermission() === "granted") {
                const writable = await this.projectFile.createWritable();
                await writable.write(this.projectConfig.toJSONString());
                await writable.close();
            }
        }
    }
    async saveProjectAs() {
        const filename = this.projectConfig.projectName;
        const fileExt = this.projectConfig.fileExt;
        if (window.showSaveFilePicker) {
            const options = {
                suggestedName: filename,
                types: [{
                        description: "Animator file",
                        accept: { 'text/plain': [fileExt] },
                    }]
            };
            const saveFile = this.projectFile = await window.showSaveFilePicker(options);
            this.projectConfig.projectName = saveFile.name.slice(0, -(fileExt.length));
            await this.saveProject();
        }
    }
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = this.initFileReader(resolve, reject);
            reader.readAsDataURL(file);
        });
    }
    fileToText(file) {
        return new Promise((resolve, reject) => {
            const reader = this.initFileReader(resolve, reject);
            reader.readAsText(file);
        });
    }
    initFileReader(resolve, reject) {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            if (typeof fileReader.result === "string") {
                resolve(fileReader.result);
            }
            //todo: process else
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
        fileReader.onloadend = (event) => {
            fileReader.onloadend = null;
            fileReader.onload = null;
            fileReader.onerror = null;
        };
        return fileReader;
    }
}
//# sourceMappingURL=FileManager.js.map