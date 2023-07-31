import {ElementBase} from "../../ElementBase";

export class Container extends ElementBase {
    constructor(classList?:string[]) {
        super();
        this.classList.add("container");

        if(classList) {
            this.classList.add(classList.join(" "));
        }
    }
}

customElements.define("el-container", Container);