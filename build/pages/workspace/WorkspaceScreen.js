import { PageBase } from "../PageBase.js";
import { Container } from "../../shared/components/container/Container.js";
import { Menu } from "../../widgets/menu/Menu.js";
import { Tools } from "../../widgets/tools/Tools.js";
import { Library } from "../../widgets/library/Library.js";
import { Timeline } from "../../widgets/timeline/Timeline.js";
import { Scene } from "../../widgets/scene/Scene.js";
import { EventListener } from "../../shared/utils/EventListener.js";
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
        this.listenEvents(new EventListener(tools, "TOOL_SELECT" /* Events.TOOL_SELECT */, (event) => {
            const toolName = tools.selectedToolName;
            if (toolName)
                scene.onToolSelect(toolName);
        }), new EventListener(library, "LIBRARY_ITEM_DROP_TO_SCENE" /* Events.LIBRARY_ITEM_DROP_TO_SCENE */, (event) => {
            const libraryMediaDropInfo = event.detail;
            event.stopPropagation();
            scene.dropLibraryMedia(libraryMediaDropInfo.media, libraryMediaDropInfo.point);
        }));
        this.append(topContainer, midContainer);
    }
}
customElements.define("el-workspace-screen", WorkspaceScreen);
//# sourceMappingURL=WorkspaceScreen.js.map