import {Events} from "./lib/Events.js";

export class ElementBase extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback():void {
        dispatchEvent(new Event(Events.ADDED_TO_DOM));
    }

    disconnectedCallback():void {
        dispatchEvent(new Event(Events.REMOVED_FROM_DOM));
    }
}