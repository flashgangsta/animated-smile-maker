import {ElementBase} from "../../../shared/ElementBase.js";
import {Container} from "../../../shared/components/container/Container.js";

export class SubPanel extends ElementBase {

    protected readonly header:Container = new Container();
    protected readonly footer:Container = new Container();
    protected readonly subPanelContainer:Container = new Container();


    constructor() {
        super();
        this.classList.add("sub-panel");
        this.header.classList.add("header");
        this.footer.classList.add("footer");
        this.subPanelContainer.classList.add("sub-panel-container");
        this.append(this.header, this.subPanelContainer, this.footer);
    }

    public appendToSubPanelContainer(...nodes: (Node | string)[]): void {
        this.subPanelContainer.append(...nodes);
    }

}