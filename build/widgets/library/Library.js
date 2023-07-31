import { Panel } from "../../features/components/panel/Panel.js";
export class Library extends Panel {
    constructor() {
        super("Library");
        this.id = "library";
    }
}
customElements.define("el-library", Library);
//# sourceMappingURL=Library.js.map