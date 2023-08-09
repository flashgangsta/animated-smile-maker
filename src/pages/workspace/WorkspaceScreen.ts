import {PageBase} from "../PageBase.js";
import {Container} from "../../shared/components/container/Container.js";
import {Menu} from "../../widgets/menu/Menu.js";
import {Tools} from "../../widgets/tools/Tools.js";
import {Library} from "../../widgets/library/Library.js";
import {Timeline} from "../../widgets/timeline/Timeline.js";
import {Scene} from "../../widgets/scene/Scene.js";
import {Events} from "../../shared/lib/Events";
import {ToolNames} from "../../shared/lib/ToolNames";
import {EventListener} from "../../shared/utils/EventListener.js";

export class WorkspaceScreen extends PageBase {
    constructor() {
        super();
        this.id = "workspace-screen";
        this.init();
    }

    private init():void {
        const topContainer:Container = new Container();
        const midContainer:Container = new Container(["mid-container"]);
        const leftContainer:Container = new Container();
        const centerContainer:Container = new Container(["center-container"]);
        const rightContainer:Container = new Container();
        const menu:Menu = new Menu();
        const tools:Tools = new Tools();
        const scene:Scene = new Scene();
        const library:Library = new Library();
        const timeline:Timeline = new Timeline();

        midContainer.append(leftContainer, centerContainer, rightContainer);

        topContainer.append(menu);
        leftContainer.append(tools);
        rightContainer.append(library);
        centerContainer.append(scene, timeline);

        this.listenEvents(
            new EventListener(tools, Events.TOOL_SELECT, (event: Event):void => {
                const toolName:ToolNames | undefined = tools.selectedToolName;
                if(toolName) scene.onToolSelect(toolName);
            })
        );

        this.append(topContainer, midContainer);
    }
}

customElements.define("el-workspace-screen", WorkspaceScreen);