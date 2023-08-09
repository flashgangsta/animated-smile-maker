import { WorkspaceScreen } from "../pages/workspace/WorkspaceScreen.js";
export class App {
    constructor() {
        const workspaceScreen = new WorkspaceScreen();
        document.body.append(workspaceScreen);
    }
}
window.addEventListener("load" /* Events.LOAD */, (event) => {
    new App();
});
//# sourceMappingURL=App.js.map