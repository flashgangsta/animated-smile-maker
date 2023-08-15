import {ElementBase} from "../../../shared/ElementBase.js";
import {ContextMenuButton} from "../context_menu_button/ContextMenuButton.js";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";
import {EventListener} from "../../../shared/utils/EventListener.js";
import {Events} from "../../../shared/lib/Events";


export class ContextMenu extends ElementBase {

    private readonly closeCallback: Function | undefined;

    constructor(contextData: IMenuContextItem, closeCallback?: Function, listenClickOutside: boolean = true) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");

        Object.keys(contextData).forEach((el: string): void => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });

        this.listenEvents(
            new EventListener(window, Events.BLUR, (event: Event) => this.closeCallback?.()),
            new EventListener(this, Events.CLICK, (event: Event) => this.onContextMenuClick(event as MouseEvent)),
        );

        if (listenClickOutside) {
            this.listenEvents(
                new EventListener(window, Events.MOUSE_DOWN, (event: Event): void => this.onWindowMouseDown(event as MouseEvent)),
            )
        }
    }


    private onWindowMouseDown(event: MouseEvent): void {
        const target: EventTarget | null = event.target;
        if (!(target instanceof ContextMenuButton)) {
            this.closeCallback?.();
        }
    }


    setOffset(x: number, y: number): void {
        this.style.top = `${y}px`;
        this.style.left = `${x}px`;
    }


    connectedCallback(): void {
        super.connectedCallback();
        const rect: DOMRect = this.getBoundingClientRect();
        const windowWidth: number = window.innerWidth;
        const windowHeight: number = window.innerHeight;
        const x: number = parseInt(this.style.left);
        const y: number = parseInt(this.style.top);

        if (rect.right > windowWidth) {
            this.style.left = `${Math.round(x - rect.width)}px`;
        }

        if (rect.bottom > windowHeight) {
            this.style.top = `${y - (rect.bottom - windowHeight)}px`;
        }
    }

    private onContextMenuClick(event: MouseEvent): void {
        if (event.target instanceof ContextMenuButton) {
            event.stopPropagation();
            this.closeCallback?.();
        }
    }
}

customElements.define("el-context-menu", ContextMenu);
