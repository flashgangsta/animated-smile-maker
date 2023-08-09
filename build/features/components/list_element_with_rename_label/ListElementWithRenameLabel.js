import { ElementBase } from "../../../shared/ElementBase.js";
import { EventListener } from "../../../shared/utils/EventListener.js";
export class ListElementWithRenameLabel extends ElementBase {
    constructor(labelText) {
        super();
        this.labelEl = document.createElement("label");
        this.labelEl.innerText = labelText;
        this.append(this.labelEl);
        this.listenEvents(new EventListener(this, "dblclick" /* Events.DB_CLICK */, (event) => this.setLabelEditable(event)), new EventListener(this.labelEl, "keydown" /* Events.KEY_DOWN */, (event) => this.onLabelKeydown(event)), new EventListener(this.labelEl, "blur" /* Events.BLUR */, (event) => this.onLabelFocusOut(event)));
    }
    get labelText() {
        return this.labelEl.innerText;
    }
    setLabelEditable(event) {
        const label = this.labelEl;
        this.lastLabelText = label.innerText;
        label.contentEditable = true.toString();
        label.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(label);
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
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