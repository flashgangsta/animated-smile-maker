import { PanelTabButton } from "./PanelTabButton.js";
export class PanelHeader extends HTMLElement {
    constructor(...tabNames) {
        super();
        this.classList.add("panel-header");
        tabNames.forEach((name) => {
            this.append(new PanelTabButton(name));
        });
    }
}
customElements.define("panel-header", PanelHeader);
//# sourceMappingURL=PanelHeader.js.map