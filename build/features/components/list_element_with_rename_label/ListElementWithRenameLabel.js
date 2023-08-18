import { EventListener } from "../../../shared/utils/EventListener.js";
import { ElementWithContext } from "../element_with_context/ElementWithContext.js";
export class ListElementWithRenameLabel extends ElementWithContext {
    lastLabelText;
    labelEl = document.createElement("label");
    constructor(labelText, menuContent) {
        super(menuContent);
        this.labelEl.innerText = labelText;
        this.append(this.labelEl);
        this.listenEvents(new EventListener(this, "mousedown" /* Events.MOUSE_DOWN */, (event) => { this.selectItem(); }), new EventListener(this, "dblclick" /* Events.DB_CLICK */, (event) => this.setLabelEditable(event)), new EventListener(this.labelEl, "keydown" /* Events.KEY_DOWN */, (event) => this.onLabelKeydown(event)), new EventListener(this.labelEl, "blur" /* Events.BLUR */, (event) => this.onLabelFocusOut(event)), new EventListener(this, "contextmenu" /* Events.CONTEXT_MENU */, (event) => { this.onRightClick(event); }));
    }
    onRightClick(event) {
        super.onRightClick(event);
        this.selectItem();
    }
    get labelText() {
        return this.labelEl.innerText;
    }
    selectItem() {
        this.classList.add("selected");
    }
    setLabelEditable(event = undefined) {
        const label = this.labelEl;
        this.lastLabelText = label.innerText;
        label.contentEditable = true.toString();
        label.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(label);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
    onLabelKeydown(event) {
        const label = this.labelEl;
        switch (event.key) {
            case "Escape" /* KeyCodes.ESCAPE */:
                label.innerText = this.lastLabelText || "";
                break;
            case "Enter" /* KeyCodes.ENTER */:
                if (!label.innerText)
                    label.innerText = this.lastLabelText || "";
                label.blur();
                break;
        }
    }
    onLabelFocusOut(event) {
        const label = this.labelEl;
        label.removeAttribute("contenteditable");
        if (this.labelText !== this.lastLabelText) {
            this.dispatchEvent(new Event("LABEL_CHANGED" /* Events.LABEL_CHANGED */, { bubbles: true }));
        }
    }
}
//# sourceMappingURL=ListElementWithRenameLabel.js.map