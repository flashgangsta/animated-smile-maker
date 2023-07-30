import {Events} from "./shared/lib/Events.js";
import {WorkspaceScreen} from "./pages/workspace/WorkspaceScreen.js";

export class App {
    constructor() {
        const workspaceScreen = new WorkspaceScreen();
        document.body.append(workspaceScreen);
    }
}

window.addEventListener(Events.LOAD, (event:Event) => {
    new App();
});