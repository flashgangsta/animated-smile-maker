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
var _Menu_instances, _Menu_menuContent, _Menu_activeContext, _Menu_fileManager, _Menu_projectConfig, _Menu_onClick, _Menu_onMouseOver, _Menu_openContext, _Menu_closeContext, _Menu_onWindowMouseDown, _Menu_importMedia, _Menu_saveProject, _Menu_saveProjectAs, _Menu_openProject, _Menu_enableSaveButton;
import { MenuButton } from "./MenuButton.js";
import { CustomElement } from "../CustomElement.js";
import { FileManager } from "../../utils/FileManager.js";
import { ProjectConfig } from "../../ProjectConfig.js";
import { MediaFile } from "../../models/MediaFile.js";
import { Events } from "../../Events.js";
import { ContextMenuButton } from "../contextMenu/ContextMenuButton.js";
import { MenuContextMenu } from "./MenuContextMenu.js";
export class Menu extends CustomElement {
    constructor() {
        super();
        _Menu_instances.add(this);
        _Menu_menuContent.set(this, {
            "File": {
                "New...": {},
                "Open": {
                    handler: () => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_openProject).call(this)
                },
                "Save": {
                    handler: () => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_saveProject).call(this),
                    disabled: true
                },
                "Save As": {
                    handler: () => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_saveProjectAs).call(this)
                },
                "Import": {
                    handler: () => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_importMedia).call(this)
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
        });
        _Menu_activeContext.set(this, void 0);
        _Menu_fileManager.set(this, new FileManager());
        _Menu_projectConfig.set(this, new ProjectConfig());
        this.id = "menu";
        Object.keys(__classPrivateFieldGet(this, _Menu_menuContent, "f")).forEach((label) => {
            this.append(new MenuButton(label));
        });
        this.addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_onClick).call(this, event));
        this.addEventListener(Events.MOUSE_OVER, (event) => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_onMouseOver).call(this, event));
        window.addEventListener(Events.MOUSE_DOWN, (event) => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_onWindowMouseDown).call(this, event));
    }
}
_Menu_menuContent = new WeakMap(), _Menu_activeContext = new WeakMap(), _Menu_fileManager = new WeakMap(), _Menu_projectConfig = new WeakMap(), _Menu_instances = new WeakSet(), _Menu_onClick = function _Menu_onClick(event) {
    const target = event.target;
    if (target instanceof MenuContextMenu) {
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeContext).call(this);
    }
    __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_openContext).call(this, event.target);
}, _Menu_onMouseOver = function _Menu_onMouseOver(event) {
    if (__classPrivateFieldGet(this, _Menu_activeContext, "f")) {
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_openContext).call(this, event.target);
    }
}, _Menu_openContext = function _Menu_openContext(target) {
    var _a;
    const button = (target && target instanceof MenuButton) ? target : null;
    if (!button || ((_a = __classPrivateFieldGet(this, _Menu_activeContext, "f")) === null || _a === void 0 ? void 0 : _a.menuButtonLabel) === button.label)
        return;
    const label = button.label;
    const contextData = __classPrivateFieldGet(this, _Menu_menuContent, "f")[label];
    __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeContext).call(this);
    __classPrivateFieldSet(this, _Menu_activeContext, new MenuContextMenu(button, contextData, () => __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeContext).call(this)), "f");
    this.append(__classPrivateFieldGet(this, _Menu_activeContext, "f"));
}, _Menu_closeContext = function _Menu_closeContext() {
    var _a;
    (_a = __classPrivateFieldGet(this, _Menu_activeContext, "f")) === null || _a === void 0 ? void 0 : _a.remove();
    __classPrivateFieldSet(this, _Menu_activeContext, null, "f");
}, _Menu_onWindowMouseDown = function _Menu_onWindowMouseDown(event) {
    const target = event.target;
    if (!(target instanceof MenuButton) && !(target instanceof ContextMenuButton)) {
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeContext).call(this);
    }
}, _Menu_importMedia = function _Menu_importMedia() {
    __classPrivateFieldGet(this, _Menu_fileManager, "f").openFile(FileManager.CONTENT_TYPE_IMAGES, true).then((files) => __awaiter(this, void 0, void 0, function* () {
        //todo: check duplicates
        const mediaFiles = [];
        for (let i = 0, len = files.length; i < len; i++) {
            const file = files[i];
            const base64 = yield __classPrivateFieldGet(this, _Menu_fileManager, "f").fileToBase64(file);
            const mediaFile = new MediaFile(file.name, file.type, base64);
            mediaFiles.push(mediaFile);
        }
        __classPrivateFieldGet(this, _Menu_projectConfig, "f").pushLibraryMedia(...mediaFiles);
    }));
}, _Menu_saveProject = function _Menu_saveProject() {
    __classPrivateFieldGet(this, _Menu_fileManager, "f").saveProject().then(() => {
        console.log(`Project file ${__classPrivateFieldGet(this, _Menu_projectConfig, "f").projectName} successfully saved.`);
    });
}, _Menu_saveProjectAs = function _Menu_saveProjectAs() {
    __classPrivateFieldGet(this, _Menu_fileManager, "f").saveProjectAs().then((a) => {
        console.log(`Project file successfully Saved As ${__classPrivateFieldGet(this, _Menu_projectConfig, "f").projectName}`);
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_enableSaveButton).call(this);
    });
}, _Menu_openProject = function _Menu_openProject() {
    __classPrivateFieldGet(this, _Menu_fileManager, "f").openProject().then((file) => {
        __classPrivateFieldGet(this, _Menu_fileManager, "f").readFile(file).then((result) => {
            __classPrivateFieldGet(this, _Menu_projectConfig, "f").loadProject(JSON.parse(String(result)));
            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_enableSaveButton).call(this);
        });
    });
}, _Menu_enableSaveButton = function _Menu_enableSaveButton() {
    __classPrivateFieldGet(this, _Menu_menuContent, "f").File.Save.disabled = false;
};
customElements.define("menu-el", Menu);
//# sourceMappingURL=Menu.js.map