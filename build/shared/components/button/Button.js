import { ElementBase } from "../../ElementBase.js";
import { Paths } from "../../consts/Paths.js";
export class Button extends ElementBase {
    constructor(label, iconPath) {
        super();
        this.disabledValue = false;
        this.classList.add("button");
        if (label) {
            this.elLabel = document.createElement("label");
            this.elLabel.innerText = label;
            this.append(this.elLabel);
        }
        if (iconPath) {
            this.elIcon = new Image();
            this.elIcon.src = Paths.STATIC_IMGS + iconPath;
            this.append(this.elIcon);
        }
    }
    get label() {
        return this.elLabel ? this.elLabel.innerText : "";
    }
    get disabled() {
        return this.disabledValue;
    }
    set disabled(value) {
        if (value !== this.disabledValue) {
            if (value) {
                this.setAttribute("disabled", "true");
            }
            else {
                this.removeAttribute("disabled");
            }
        }
    }
}
//# sourceMappingURL=Button.js.map