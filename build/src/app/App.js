import { WorkspaceScreen } from "../pages/workspace/WorkspaceScreen";
import { Events } from "../shared/lib/Events";
export class App {
    constructor() {
        const workspaceScreen = new WorkspaceScreen();
        document.body.append(workspaceScreen);
    }
}
window.addEventListener(Events.LOAD, (event) => {
    new App();
});
//# sourceMappingURL=App.js.map