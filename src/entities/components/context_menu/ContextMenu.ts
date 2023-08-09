import {ElementBase} from "../../../shared/ElementBase.js";
import {ContextMenuButton} from "../context_menu_button/ContextMenuButton.js";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";
import {EventListener} from "../../../shared/utils/EventListener.js";
import {Events} from "../../../shared/lib/Events";
import {MenuButton} from "../../../features/components/menu_button/MenuButton";

export class ContextMenu extends ElementBase {

    private readonly closeCallback:Function | undefined;
    constructor(contextData:IMenuContextItem, closeCallback?:Function, listenClickOutside:boolean = true) {
        super();
        this.closeCallback = closeCallback;
        this.classList.add("context-menu");

        Object.keys(contextData).forEach((el:string) => {
            this.append(new ContextMenuButton(el, contextData[el]));
        });

        this.listenEvents(
            new EventListener(window, Events.BLUR, (event: Event) => this.closeCallback?.()),
        );

        if(listenClickOutside) {
            this.listenEvents(
                new EventListener(window, Events.MOUSE_DOWN, (event: Event): void => this.onWindowMouseDown(event as MouseEvent)),
            )
        }
    }

    private onWindowMouseDown(event: MouseEvent):void {
        //todo: test it
        const target: EventTarget | null = event.target;
        if(!(target instanceof ContextMenuButton)) {
            this.closeCallback?.();
        }
    }
}

customElements.define("el-context-menu", ContextMenu);