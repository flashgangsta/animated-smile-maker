import { PageBase } from "../PageBase";
import { Container } from "../../shared/components/container/Container";
import { Menu } from "../../widgets/menu/Menu";
export class WorkspaceScreen extends PageBase {
    constructor() {
        super();
        this.init();
    }
    init() {
        const topContainer = new Container();
        const midContainer = new Container(["mid-container"]);
        const leftContainer = new Container();
        const centerContainer = new Container(["center-container"]);
        const rightContainer = new Container();
        const menu = new Menu();
        midContainer.append(leftContainer, centerContainer, rightContainer);
        topContainer.append(menu);
        //leftContainer.append(tools);
        //rightContainer.append(library);
        //centerContainer.append(body, timeline);
        this.append(topContainer, midContainer);
    }
}
customElements.define("el-workspace-screen", WorkspaceScreen);
//# sourceMappingURL=WorkspaceScreen.js.map