import {PanelTabButton} from "./PanelTabButton.js";

export class PanelHeader extends HTMLElement {
    constructor(...tabNames:string[]) {
        super();

        this.classList.add("panel-header");

        tabNames.forEach((name:string):void => {
            this.append(new PanelTabButton(name));
        })
    }
}


customElements.define("el-panel-header", PanelHeader);