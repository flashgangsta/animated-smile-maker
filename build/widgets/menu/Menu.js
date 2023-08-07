import { ElementBase } from "../../shared/ElementBase.js";
import { MenuButton } from "../../features/components/menu_button/MenuButton.js";
import { MenuContextMenu } from "../../features/components/menu_context_menu/MenuContextMenu.js";
import { ContextMenuButton } from "../../entities/components/context_menu_button/ContextMenuButton.js";
import { EventListener } from "../../shared/utils/EventListener.js";
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
}
customElements.define("el-menu", Menu);
//# sourceMappingURL=Menu.js.map