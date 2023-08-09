import {PanelButton} from "./PanelButton.js";

export class PanelButtonRemove extends PanelButton {
    constructor() {
        super("remove-layer-ico.png");
    }
}

customElements.define("el-panel-button-remove", PanelButtonRemove);