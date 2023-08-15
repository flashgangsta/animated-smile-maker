import {EventListener} from "../../../shared/utils/EventListener.js";
import {Events} from "../../../shared/lib/Events";
import {KeyCodes} from "../../../shared/lib/KeyCodes";
import {ElementWithContext} from "../element_with_context/ElementWithContext.js";
import {IMenuContextItem} from "../../../shared/interfaces/IMenuContentData";

export class ListElementWithRenameLabel extends ElementWithContext {

    private lastLabelText: string | undefined;
    private labelEl: HTMLLabelElement = document.createElement("label");

    constructor(labelText: string, menuContent: IMenuContextItem) {
        super(menuContent);
        this.labelEl.innerText = labelText;
        this.append(this.labelEl);

        this.listenEvents(
            new EventListener(this, Events.CLICK, (event: Event) => { this.selectItem(); }),
            new EventListener(this, Events.DB_CLICK, (event: Event) => this.setLabelEditable(event as MouseEvent)),
            new EventListener(this.labelEl, Events.KEY_DOWN, (event: Event) => this.onLabelKeydown(event as KeyboardEvent)),
            new EventListener(this.labelEl, Events.BLUR, (event: Event) => this.onLabelFocusOut(event as FocusEvent)),
            new EventListener(this, Events.CONTEXT_MENU, (event: Event): void => { this.onRightClick(event as MouseEvent); }),
        )
    }

    override onRightClick(event: MouseEvent) {
        super.onRightClick(event);
        this.selectItem();
    }


    public get labelText() {
        return this.labelEl.innerText;
    }


    protected selectItem(): void {
        this.classList.add("selected");
    }


    protected setLabelEditable(event: MouseEvent | undefined = undefined): void {
        const label: HTMLLabelElement = this.labelEl;
        this.lastLabelText = label.innerText;
        label.contentEditable = true.toString();
        label.focus();

        const selection: Selection | null = window.getSelection();
        const range: Range = document.createRange();
        range.selectNodeContents(label);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }

    private onLabelKeydown(event: KeyboardEvent) {
        const label: HTMLLabelElement = this.labelEl;

        switch (event.key) {
            case KeyCodes.ESCAPE:
                label.innerText = this.lastLabelText || "";
                break;
            case KeyCodes.ENTER:
                if(!label.innerText) label.innerText = this.lastLabelText || "";
                label.blur();
                break;
        }
    }

    private onLabelFocusOut(event: FocusEvent) {
        const label: HTMLLabelElement = this.labelEl;
        label.removeAttribute("contenteditable");
        if(this.labelText !== this.lastLabelText) {
            this.dispatchEvent(new Event(Events.LABEL_CHANGED, {bubbles: true}));
        }
    }
}