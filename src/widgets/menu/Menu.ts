import {ElementBase} from "../../shared/ElementBase.js";
import {Events} from "../../shared/lib/Events";
import {MenuButton} from "../../features/components/menu_button/MenuButton.js";
import {MenuContextMenu} from "../../features/components/menu_context_menu/MenuContextMenu.js";
import {IMenuContent, IMenuContextItem} from "../../shared/interfaces/IMenuContentData";
import {ContextMenuButton} from "../../entities/components/context_menu_button/ContextMenuButton.js";
import {EventListener} from "../../shared/utils/EventListener.js";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {FileManager} from "../../shared/utils/FileManager.js";
import {MediaFile} from "../../shared/utils/MediaFile.js";


export class Menu extends ElementBase {

    private readonly menuContent:IMenuContent = {
        "File": {
            "New...": {},
            "Open": {
                handler: () => this.openProject()
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
    }
    private activeContext: MenuContextMenu | undefined;
    private readonly projectConfig:ProjectConfig = ProjectConfig.getInstance();
    private readonly fileManager:FileManager = FileManager.getInstance();

    constructor() {
        super();
        this.id = "menu";
        this.init();
    }


    private init(): void {
        Object.keys(this.menuContent).forEach((label: string) => {
            this.append(new MenuButton(label));
        });

        this.listenEvents(
            new EventListener(this, Events.CLICK, (event: Event): void => this.onClick(event as MouseEvent)),
            new EventListener(this, Events.MOUSE_OVER, (event: Event): void => this.onMouseOver(event as MouseEvent)),
            new EventListener(window, Events.MOUSE_DOWN, (event: Event): void => this.onWindowMouseDown(event as MouseEvent)),
        );
    }


    private openProject(): void {
        this.fileManager.openProject().then((file: File): void => {
            this.fileManager.fileToText(file)
                .then((result: string): void => {
                    this.projectConfig.loadProject(JSON.parse(String(result)));
                    this.enableSaveButton();
                })
                .catch((reason):void => {
                    //todo: process errors
                    console.log(reason);
                })
        });
    }

    private saveProject(): void {

    }

    private saveProjectAs(): void {

    }

    private importMedia(): void {
        this.fileManager.openFiles(undefined, true).then(async (files:File[]):Promise<void> => {
            //todo: check duplicates

            const mediaFiles: MediaFile[] = [];

            for (let i: number = 0, len: number = files.length; i < len; i++) {
                const file: File = files[i];
                const base64: string = await this.fileManager.fileToBase64(file);
                const mediaFile: MediaFile = new MediaFile(file.name, file.type, base64);
                mediaFiles.push(mediaFile);
            }

            this.projectConfig.pushLibraryMedia(...mediaFiles);
        });
    }

    private onClick(event: Event): void {
        const target: EventTarget | null = event.target;
        if (target && target instanceof MenuContextMenu) {
            this.closeContext();
        }
        this.openContext(event.target);
    }

    private onMouseOver(event: Event):void {
        if(this.activeContext) {
            this.openContext(event.target);
        }
    }

    private onWindowMouseDown(event: Event):void {
        const target = event.target;
        if(!(target instanceof MenuButton) && !(target instanceof ContextMenuButton)) {
            this.closeContext();
        }
    }

    private openContext(target: EventTarget | null) {
        const button = (target && target instanceof MenuButton) ? target : undefined;
        if (!button || this.activeContext?.menuButtonLabel === button.label) return;
        const label:string = button.label;
        const contextData:IMenuContextItem = this.menuContent[label];

        this.closeContext();
        this.activeContext = new MenuContextMenu(button, contextData, () => this.closeContext());
        this.append(this.activeContext);
    }

    private closeContext() {
        this.activeContext?.remove();
        this.activeContext = undefined;
    }


    private enableSaveButton():void {
        this.menuContent.File.Save.disabled = false;
    }
}

customElements.define("el-menu", Menu);