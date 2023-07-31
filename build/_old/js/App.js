import { Interface } from "./app/interface/Interface.js";
import { Events } from "./app/Events.js";
export class App {
    constructor() {
        const appInterface = new Interface();
        document.body.append(appInterface);
        appInterface.dispatchEvent(new Event(Events.ADDED_TO_DOM));
    }
}
window.addEventListener(Events.LOAD, (event) => {
    new App();
});
//# sourceMappingURL=App.js.map