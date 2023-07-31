var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _FileManager_instances, _FileManager_projectConfig, _FileManager_fileExt, _FileManager_input, _FileManager_projectFile, _FileManager_initFileReader;
import { ProjectConfig } from "../ProjectConfig.js";
export class FileManager {
    static get CONTENT_TYPE_IMAGES() { return "image/*"; }
    constructor() {
        _FileManager_instances.add(this);
        _FileManager_projectConfig.set(this, new ProjectConfig());
        _FileManager_fileExt.set(this, ".anmtr");
        _FileManager_input.set(this, document.createElement("input"));
        _FileManager_projectFile.set(this, void 0);
        if (!FileManager.instance) {
            FileManager.instance = this;
            __classPrivateFieldGet(this, _FileManager_input, "f").type = "file";
        }
        return FileManager.instance;
    }
    static getInstance() {
        return new FileManager();
    }
    openFile(contentType = null, multiple = false) {
        const input = __classPrivateFieldGet(this, _FileManager_input, "f");
        contentType ? input.accept = contentType : input.removeAttribute("accept");
        multiple ? input.setAttribute("multiple", "") : input.removeAttribute("multiple");
        return new Promise(resolve => {
            input.onchange = () => {
                let files = Array.from(input.files);
                input.onchange = null;
                resolve(multiple ? files : files[0]);
            };
            input.click();
        });
    }
    openProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const [fileHandle] = yield window.showOpenFilePicker({
                types: [{
                        description: "Animator file",
                        accept: { 'text/plain': [__classPrivateFieldGet(this, _FileManager_fileExt, "f")] }
                    }],
                excludeAcceptAllOption: true,
                multiple: false,
            });
            __classPrivateFieldSet(this, _FileManager_projectFile, fileHandle, "f");
            const file = yield fileHandle.getFile();
            return file;
        });
    }
    saveProjectAs() {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = __classPrivateFieldGet(this, _FileManager_projectConfig, "f").projectName || "Untitled";
            const fileExt = __classPrivateFieldGet(this, _FileManager_fileExt, "f");
            if (window.showSaveFilePicker) {
                //FileSystem API
                //https://fjolt.com/article/javascript-new-file-system-api
                const options = {
                    suggestedName: filename,
                    types: [{
                            description: "Animator file",
                            accept: { 'text/plain': [fileExt] },
                        }]
                };
                const saveFile = __classPrivateFieldSet(this, _FileManager_projectFile, yield window.showSaveFilePicker(options), "f");
                __classPrivateFieldGet(this, _FileManager_projectConfig, "f").projectName = saveFile.name.slice(0, -(fileExt.length));
                yield this.saveProject();
            }
            else {
                //legacy
                const a = document.createElement("a");
                a.href = URL.createObjectURL(new Blob([__classPrivateFieldGet(this, _FileManager_projectConfig, "f").toString()], { type: 'text/plain' }));
                a.download = `${filename}${fileExt}`;
                a.click();
                URL.revokeObjectURL(a.href);
                a.remove();
            }
        });
    }
    saveProject() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield __classPrivateFieldGet(this, _FileManager_projectFile, "f").queryPermission()) === "granted") {
                const writable = yield __classPrivateFieldGet(this, _FileManager_projectFile, "f").createWritable();
                yield writable.write(__classPrivateFieldGet(this, _FileManager_projectConfig, "f").toString());
                yield writable.close();
            }
        });
    }
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = __classPrivateFieldGet(this, _FileManager_instances, "m", _FileManager_initFileReader).call(this, resolve, reject);
            reader.readAsDataURL(file);
        });
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = __classPrivateFieldGet(this, _FileManager_instances, "m", _FileManager_initFileReader).call(this, resolve, reject);
            reader.readAsText(file);
        });
    }
}
_FileManager_projectConfig = new WeakMap(), _FileManager_fileExt = new WeakMap(), _FileManager_input = new WeakMap(), _FileManager_projectFile = new WeakMap(), _FileManager_instances = new WeakSet(), _FileManager_initFileReader = function _FileManager_initFileReader(resolve, reject) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
        resolve(fileReader.result);
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
};
//# sourceMappingURL=FileManager.js.map