import {ElementBase} from "../../shared/ElementBase";
import {Events} from "../../shared/lib/Events";
import {MenuButton} from "../../features/components/menu_button/MenuButton";
import {MenuContextMenu} from "../../features/components/menu_context_menu/MenuContextMenu";
import {IMenuContent, IMenuContextItem} from "../../shared/interfaces/IMenuContentData";
import {ContextMenuButton} from "../../entities/components/context_menu_button/ContextMenuButton";


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

    constructor() {
        super();
        this.init();
    }


    private init(): void {
        Object.keys(this.menuContent).forEach((label: string) => {
            this.append(new MenuButton(label));
        });

        this.addEventListener(Events.CLICK, (event: Event) => this.onClick(event));
        this.addEventListener(Events.MOUSE_OVER, (event: Event) => this.onMouseOver(event));
        window.addEventListener(Events.MOUSE_DOWN, (event: Event) => this.onWindowMouseDown(event));
    }


    private openProject(): void {

    }

    private saveProject(): void {

    }

    private saveProjectAs(): void {

    }

    private importMedia(): void {

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
}

customElements.define("el-menu", Menu);