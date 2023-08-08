import {ContextMenu} from "../../entities/components/context_menu/ContextMenu.js";
import {IMenuContextItem} from "../../shared/interfaces/IMenuContentData";

export class TimelineContextMenu extends ContextMenu {
    private readonly TOP_MARGIN: number = -20;
    private readonly frameX: number;
    private x: number = 0;
    private y: number = 0;

    constructor(frameX: number, menuContent: IMenuContextItem, closeCallback?:Function) {
        super(menuContent, closeCallback);
        this.frameX = frameX;
    }


    setOffset(x: number, y: number): void {
        this.x = x + this.frameX;
        this.y = y + this.TOP_MARGIN;
        this.style.top = `${this.y}px`;
        this.style.left = `${this.x}px`;

    }


    connectedCallback() {
        super.connectedCallback();
        const rect: DOMRect = this.getBoundingClientRect();
        const windowWidth: number = window.innerWidth;
        const windowHeight: number = window.innerHeight;

        if(rect.right > windowWidth) {
            this.style.left = `${Math.round(this.x - rect.width)}px`;
        }

        if(rect.bottom > windowHeight) {
            this.style.top = `${this.y - (rect.bottom - windowHeight) + this.TOP_MARGIN}px`;
        }
    }
}