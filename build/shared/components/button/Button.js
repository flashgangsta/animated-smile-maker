import { ElementBase } from "../../ElementBase.js";
export class Button extends ElementBase {
    elLabel;
    elIcon;
    disabledValue = false;
    constructor(label, iconPath) {
        super();
        this.classList.add("button");
        this.role = "button";
        if (label) {
            this.elLabel = document.createElement("label");
            this.elLabel.innerText = label;
            this.append(this.elLabel);
        }
        if (iconPath) {
            this.elIcon = new Image();
            this.elIcon.src = "./build/static/img/" /* Paths.STATIC_IMGS */ + iconPath;
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