import { Events } from "./lib/Events";
export class ElementBase extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        dispatchEvent(new Event(Events.ADDED_TO_DOM));
    }
    disconnectedCallback() {
        dispatchEvent(new Event(Events.REMOVED_FROM_DOM));
    }
}
//# sourceMappingURL=ElementBase.js.map