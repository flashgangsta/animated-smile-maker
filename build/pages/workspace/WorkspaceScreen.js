import { PageBase } from "../PageBase.js";
import { Container } from "../../shared/components/container/Container.js";
import { Menu } from "../../widgets/menu/Menu.js";
import { Tools } from "../../widgets/tools/Tools.js";
import { Library } from "../../widgets/library/Library.js";
import { Timeline } from "../../widgets/timeline/Timeline.js";
import { Scene } from "../../widgets/scene/Scene.js";
export class WorkspaceScreen extends PageBase {
    constructor() {
        super();
        this.id = "workspace-screen";
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
        const scene = new Scene();
        const library = new Library();
        const timeline = new Timeline();
        midContainer.append(leftContainer, centerContainer, rightContainer);
        topContainer.append(menu);
        leftContainer.append(tools);
        rightContainer.append(library);
        centerContainer.append(scene, timeline);
        this.append(topContainer, midContainer);
    }
}
customElements.define("el-workspace-screen", WorkspaceScreen);
//# sourceMappingURL=WorkspaceScreen.js.map