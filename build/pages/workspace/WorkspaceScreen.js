import { PageBase } from "../PageBase.js";
import { Container } from "../../shared/components/container/Container.js";
import { Menu } from "../../widgets/menu/Menu.js";
import { Tools } from "../../widgets/tools/Tools.js";
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
        const tools = new Tools();
        /*const body = new Body();
        const library = new Library();
        const timeline = new Timeline();*/
        midContainer.append(leftContainer, centerContainer, rightContainer);
        topContainer.append(menu);
        leftContainer.append(tools);
        //rightContainer.append(library);
        //centerContainer.append(body, timeline);
        this.append(topContainer, midContainer);
    }
}
customElements.define("el-workspace-screen", WorkspaceScreen);
//# sourceMappingURL=WorkspaceScreen.js.map