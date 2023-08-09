var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElementBase } from "../../shared/ElementBase.js";
import { MenuButton } from "../../features/components/menu_button/MenuButton.js";
import { MenuContextMenu } from "../../features/components/menu_context_menu/MenuContextMenu.js";
import { ContextMenuButton } from "../../entities/components/context_menu_button/ContextMenuButton.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { FileManager } from "../../shared/utils/FileManager.js";
import { MediaFile } from "../../shared/utils/MediaFile.js";
export class Menu extends ElementBase {
    constructor() {
        super();
        this.menuContent = {
            "File": {
                "New...": {},
                "Open": {
                    handler: () => this.openProject(),
                },
                "Save": {
                    handler: () => this.saveProject(),
                    disabled: true
                },
                "Save As": {
                    handler: () => this.saveProjectAs()
                },
                "Import": {
                    handler: () => this.importMedia()
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
        };
        this.projectConfig = ProjectConfig.getInstance();
        this.fileManager = FileManager.getInstance();
        this.id = "menu";
        this.init();
    }
    init() {
        Object.keys(this.menuContent).forEach((label) => {
            this.append(new MenuButton(label));
        });
        this.listenEvents(new EventListener(this, "click" /* Events.CLICK */, (event) => this.onClick(event)), new EventListener(this, "mouseover" /* Events.MOUSE_OVER */, (event) => this.onMouseOver(event)), new EventListener(window, "mousedown" /* Events.MOUSE_DOWN */, (event) => this.onWindowMouseDown(event)));
    }
    openProject() {
        this.fileManager.openProject().then((file) => {
            this.fileManager.fileToText(file)
                .then((result) => {
                this.projectConfig.loadProject(JSON.parse(String(result)));
                this.enableSaveButton();
            })
                .catch((reason) => {
                //todo: process errors
                console.log(reason);
            });
        });
    }
    saveProject() {
        this.fileManager.saveProject().then(() => {
            console.log(`Project file ${this.projectConfig.projectName} successfully saved.`);
        });
    }
    saveProjectAs() {
        this.fileManager.saveProjectAs().then((a) => {
            console.log(`Project file successfully Saved As ${this.projectConfig.projectName}`);
            this.enableSaveButton();
        });
    }
    importMedia() {
        this.fileManager.openFiles(undefined, true).then((files) => __awaiter(this, void 0, void 0, function* () {
            //todo: check duplicates
            const mediaFiles = [];
            for (let i = 0, len = files.length; i < len; i++) {
                const file = files[i];
                const base64 = yield this.fileManager.fileToBase64(file);
                const mediaFile = new MediaFile(file.name, file.type, base64);
                mediaFiles.push(mediaFile);
            }
            this.projectConfig.pushLibraryMedia(...mediaFiles);
        }));
    }
    onClick(event) {
        const target = event.target;
        if (target && target instanceof MenuContextMenu) {
            this.closeContext();
        }
        this.openContext(event.target);
    }
    onMouseOver(event) {
        if (this.activeContext) {
            this.openContext(event.target);
        }
    }
    onWindowMouseDown(event) {
        const target = event.target;
        if (!(target instanceof MenuButton) && !(target instanceof ContextMenuButton)) {
            this.closeContext();
        }
    }
    openContext(target) {
        var _a;
        const button = (target && target instanceof MenuButton) ? target : undefined;
        if (!button || ((_a = this.activeContext) === null || _a === void 0 ? void 0 : _a.menuButtonLabel) === button.label)
            return;
        const label = button.label;
        const contextData = this.menuContent[label];
        this.closeContext();
        this.activeContext = new MenuContextMenu(button, contextData, () => this.closeContext());
        this.append(this.activeContext);
    }
    closeContext() {
        var _a;
        (_a = this.activeContext) === null || _a === void 0 ? void 0 : _a.remove();
        this.activeContext = undefined;
    }
    enableSaveButton() {
        this.menuContent.File.Save.disabled = false;
    }
}
customElements.define("el-menu", Menu);
//# sourceMappingURL=Menu.js.map