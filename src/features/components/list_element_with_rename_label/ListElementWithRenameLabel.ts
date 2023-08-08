import {ElementBase} from "../../../shared/ElementBase.js";
import {EventListener} from "../../../shared/utils/EventListener.js";
import {Events} from "../../../shared/lib/Events";
import {KeyCodes} from "../../../shared/lib/KeyCodes";

export class ListElementWithRenameLabel extends ElementBase {

    private lastLabelText: string | undefined;
    private labelEl: HTMLLabelElement = document.createElement("label");

    constructor(labelText: string) {
        super();
        this.labelEl.innerText = labelText;
        this.append(this.labelEl);

        this.listenEvents(
            new EventListener(this, Events.DB_CLICK, (event: Event) => this.setLabelEditable(event as MouseEvent)),
            new EventListener(this.labelEl, Events.KEY_DOWN, (event: Event) => this.onLabelKeydown(event as KeyboardEvent)),
            new EventListener(this.labelEl, Events.BLUR, (event: Event) => this.onLabelFocusOut(event as FocusEvent)),
        )
    }

    public get labelText() {
        return this.labelEl.innerText;
    }

    private setLabelEditable(event: MouseEvent) {
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