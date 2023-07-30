import {PageBase} from "../PageBase.js";
import {Container} from "../../shared/components/container/Container.js";
import {Menu} from "../../widgets/menu/Menu.js";

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

        midContainer.append(leftContainer, centerContainer, rightContainer);

        topContainer.append(menu);
        //leftContainer.append(tools);
        //rightContainer.append(library);
        //centerContainer.append(body, timeline);

        this.append(topContainer, midContainer);
    }
}

customElements.define("el-workspace-screen", WorkspaceScreen);