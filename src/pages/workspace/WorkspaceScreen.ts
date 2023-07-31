import {PageBase} from "../PageBase.js";
import {Container} from "../../shared/components/container/Container.js";
import {Menu} from "../../widgets/menu/Menu.js";
import {Tools} from "../../widgets/tools/Tools.js";

export class WorkspaceScreen extends PageBase {
    constructor() {
        super();
        this.init();
    }

    private init():void {
        const topContainer:Container = new Container();
        const midContainer:Container = new Container(["mid-container"]);
        const leftContainer:Container = new Container();
        const centerContainer:Container = new Container(["center-container"]);
        const rightContainer:Container = new Container();
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