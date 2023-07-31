import {ElementBase} from "../../ElementBase.js";
import {Paths} from "../../consts/Paths.js";

export class Button extends ElementBase {

    private readonly elLabel:HTMLLabelElement | undefined;
    private readonly elIcon:HTMLImageElement | undefined;
    private disabledValue:boolean = false;


    constructor(label?:string, iconPath?:string) {
        super();
        this.classList.add("button");
        this.role = "button";

        if(label) {
            this.elLabel = document.createElement("label");
            this.elLabel.innerText = label;
            this.append(this.elLabel);
        }

        if(iconPath) {
            this.elIcon = new Image();
            this.elIcon.src = Paths.STATIC_IMGS + iconPath;
            this.append(this.elIcon);
        }
    }


    get label():string {
        return this.elLabel ? this.elLabel.innerText : "";
    }


    get disabled():boolean {
        return this.disabledValue;
    }


    set disabled(value:boolean) {
        if(value !== this.disabledValue) {
            if(value) {
                this.setAttribute("disabled", "true");
            } else {
                this.removeAttribute("disabled");
            }
        }
    }
}