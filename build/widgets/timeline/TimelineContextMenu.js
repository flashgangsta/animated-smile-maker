import { ContextMenu } from "../../entities/components/context_menu/ContextMenu.js";
export class TimelineContextMenu extends ContextMenu {
    constructor(frameX, menuContent, closeCallback) {
        super(menuContent, closeCallback);
        this.TOP_MARGIN = -20;
        this.x = 0;
        this.y = 0;
        this.frameX = frameX;
    }
    setOffset(x, y) {
        this.x = x + this.frameX;
        this.y = y + this.TOP_MARGIN;
        this.style.top = `${this.y}px`;
        this.style.left = `${this.x}px`;
    }
    connectedCallback() {
        super.connectedCallback();
        const rect = this.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (rect.right > windowWidth) {
            this.style.left = `${Math.round(this.x - rect.width)}px`;
        }
        if (rect.bottom > windowHeight) {
            this.style.top = `${this.y - (rect.bottom - windowHeight) + this.TOP_MARGIN}px`;
        }
    }
}
customElements.define("el-timeline-context-menu", TimelineContextMenu);
//# sourceMappingURL=TimelineContextMenu.js.map