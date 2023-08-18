import { ElementBase } from "../../shared/ElementBase.js";
import { MenuButton } from "../../features/components/menu_button/MenuButton.js";
import { MenuContextMenu } from "../../features/components/menu_context_menu/MenuContextMenu.js";
import { ContextMenuButton } from "../../entities/components/context_menu_button/ContextMenuButton.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { FileManager } from "../../shared/utils/FileManager.js";
import { MediaFile } from "../../shared/utils/MediaFile.js";
export class Menu extends ElementBase {
    menuContent = {
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
    activeContext;
    projectConfig = ProjectConfig.getInstance();
    fileManager = FileManager.getInstance();
    constructor() {
        super();
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
        this.fileManager.openFiles(undefined, true).then(async (files) => {
            //todo: check duplicates
            const mediaFiles = [];
            for (let i = 0, len = files.length; i < len; i++) {
                const file = files[i];
                const base64 = await this.fileManager.fileToBase64(file);
                const mediaFile = new MediaFile(file.name, file.type, base64);
                mediaFiles.push(mediaFile);
            }
            this.projectConfig.pushLibraryMedia(...mediaFiles);
        });
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
        const button = (target && target instanceof MenuButton) ? target : undefined;
        if (!button || this.activeContext?.menuButtonLabel === button.label)
            return;
        const label = button.label;
        const contextData = this.menuContent[label];
        this.closeContext();
        this.activeContext = new MenuContextMenu(button, contextData, () => this.closeContext());
        this.append(this.activeContext);
    }
    closeContext() {
        this.activeContext?.remove();
        this.activeContext = undefined;
    }
    enableSaveButton() {
        this.menuContent.File.Save.disabled = false;
    }
}
customElements.define("el-menu", Menu);
//# sourceMappingURL=Menu.js.map