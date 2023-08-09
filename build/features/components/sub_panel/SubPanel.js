import { ElementBase } from "../../../shared/ElementBase.js";
import { Container } from "../../../shared/components/container/Container.js";
export class SubPanel extends ElementBase {
    constructor() {
        super();
        this.header = new Container();
        this.footer = new Container();
        this.subPanelContainer = new Container();
        this.classList.add("sub-panel");
        this.header.classList.add("header");
        this.footer.classList.add("footer");
        this.subPanelContainer.classList.add("sub-panel-container");
        this.append(this.header, this.subPanelContainer, this.footer);
    }
}
//# sourceMappingURL=SubPanel.js.map