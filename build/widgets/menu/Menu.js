import { ElementBase } from "../../shared/ElementBase.js";
import { Events } from "../../shared/lib/Events.js";
import { MenuButton } from "../../features/components/menu_button/MenuButton.js";
import { MenuContextMenu } from "../../features/components/menu_context_menu/MenuContextMenu.js";
export class Menu extends ElementBase {
    constructor() {
        super();
        this.menuContent = {
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
        };
        this.init();
    }
    init() {
        Object.keys(this.menuContent).forEach((label) => {
            this.append(new MenuButton(label));
        });
        this.addEventListener(Events.CLICK, (event) => this.onClick(event));
        this.addEventListener(Events.MOUSE_OVER, (event) => this.onMouseOver(event));
        window.addEventListener(Events.MOUSE_DOWN, (event) => this.onWindowMouseDown(event));
    }
    openProject() {
    }
    saveProject() {
    }
    saveProjectAs() {
    }
    importMedia() {
    }
    onClick(event) {
        const target = event.target;
        if (target && target instanceof MenuContextMenu) {
            this.closeContext();
        }
        console.log(target);
        this.openContext(event.target);
    }
    onMouseOver(event) {
    }
    onWindowMouseDown(event) {
    }
    closeContext() {
    }
    openContext(target) {
        var _a;
        const button = (target && target instanceof MenuButton) ? target : undefined;
        console.log(button);
        if (!button || ((_a = this.activeContext) === null || _a === void 0 ? void 0 : _a.menuButtonLabel) === button.label)
            return;
        const label = button.label;
        const contextData = this.menuContent[label];
        this.closeContext();
        this.activeContext = new MenuContextMenu(button, contextData, () => this.closeContext());
        this.append(this.activeContext);
        console.log("append context");
    }
}
customElements.define("el-menu", Menu);
//# sourceMappingURL=Menu.js.map