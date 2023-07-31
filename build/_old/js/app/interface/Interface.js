var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Interface_instances, _Interface_addedToDOM;
import { Timeline } from "./timeline/Timeline.js";
import { Library } from "./library/Library.js";
import { Menu } from "./menu/Menu.js";
import { Tools } from "./tools/Tools.js";
import { Body } from "./Body.js";
import { Container } from "./Container.js";
import { CustomElement } from "./CustomElement.js";
import { EventListener } from "../models/EventListener.js";
import { Events } from "../Events.js";
export class Interface extends CustomElement {
    constructor() {
        super();
        _Interface_instances.add(this);
        this.id = "interface";
        const handler = () => {
            __classPrivateFieldGet(this, _Interface_instances, "m", _Interface_addedToDOM).call(this);
            this.stopListenEvent(Event.ADDED_TO_DOM, handler);
        };
        this.listenEvents(new EventListener(this, Events.ADDED_TO_DOM, handler));
    }
}
_Interface_instances = new WeakSet(), _Interface_addedToDOM = function _Interface_addedToDOM() {
    const topContainer = new Container();
    const midContainer = new Container();
    const leftContainer = new Container();
    const centerContainer = new Container();
    const rightContainer = new Container();
    const menu = new Menu();
    const tools = new Tools();
    const body = new Body();
    const library = new Library();
    const timeline = new Timeline();
    midContainer.classList.add("mid-container");
    midContainer.append(leftContainer, centerContainer, rightContainer);
    centerContainer.classList.add("center-container");
    this.append(topContainer, midContainer);
    topContainer.append(menu);
    leftContainer.append(tools);
    rightContainer.append(library);
    centerContainer.append(body, timeline);
    tools.addEventListener(Events.TOOL_SELECT, (event) => {
        body.onToolSelect(tools.selectedToolName);
    });
};
customElements.define("interface-el", Interface);
//# sourceMappingURL=Interface.js.map