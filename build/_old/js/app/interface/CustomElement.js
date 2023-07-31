var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CustomElement_instances, _CustomElement_eventListeners, _CustomElement_isAddedToDOM, _CustomElement_dispatchAddedToDOM;
import { EventListener } from "../models/EventListener.js";
import { Events } from "../Events.js";
export class CustomElement extends HTMLElement {
    constructor() {
        super();
        _CustomElement_instances.add(this);
        _CustomElement_eventListeners.set(this, []);
        _CustomElement_isAddedToDOM.set(this, false);
        const thisAddedToDOMHandler = () => {
            __classPrivateFieldSet(this, _CustomElement_isAddedToDOM, true, "f");
            this.stopListenEvent(Event.ADDED_TO_DOM, thisAddedToDOMHandler);
        };
        this.listenEvents(new EventListener(this, Events.ADDED_TO_DOM, thisAddedToDOMHandler));
    }
    get isAddedToDom() {
        return __classPrivateFieldGet(this, _CustomElement_isAddedToDOM, "f");
    }
    listenEvents(...eventListeners) {
        __classPrivateFieldGet(this, _CustomElement_eventListeners, "f").push(...eventListeners);
    }
    stopListenEvents() {
        if (!__classPrivateFieldGet(this, _CustomElement_eventListeners, "f"))
            return;
        __classPrivateFieldGet(this, _CustomElement_eventListeners, "f").forEach((eventListener) => eventListener.dispose());
        __classPrivateFieldSet(this, _CustomElement_eventListeners, null, "f");
    }
    stopListenEvent(type, handler) {
        const listenersByType = __classPrivateFieldGet(this, _CustomElement_eventListeners, "f").filter(listener => listener.type === type);
        let result;
        if (handler) {
            result = listenersByType.filter(listener => listener.handler === handler);
        }
        else {
            result = listenersByType;
        }
        result.forEach((listener) => {
            const index = __classPrivateFieldGet(this, _CustomElement_eventListeners, "f").indexOf(listener);
            __classPrivateFieldGet(this, _CustomElement_eventListeners, "f").splice(index, 1);
            listener.dispose();
        });
    }
    remove() {
        this.stopListenEvents();
        this.removeChildren();
        super.remove();
        this.dispatchEvent(new Event(Events.REMOVED_FROM_DOM));
        __classPrivateFieldSet(this, _CustomElement_isAddedToDOM, false, "f");
    }
    removeChildren() {
        Array.from(this.children).forEach((child) => {
            child.remove();
        });
    }
    append(...nodes) {
        super.append(...nodes);
        __classPrivateFieldGet(this, _CustomElement_instances, "m", _CustomElement_dispatchAddedToDOM).call(this, ...nodes);
    }
    prepend(...nodes) {
        super.prepend(...nodes);
        __classPrivateFieldGet(this, _CustomElement_instances, "m", _CustomElement_dispatchAddedToDOM).call(this, ...nodes);
    }
}
_CustomElement_eventListeners = new WeakMap(), _CustomElement_isAddedToDOM = new WeakMap(), _CustomElement_instances = new WeakSet(), _CustomElement_dispatchAddedToDOM = function _CustomElement_dispatchAddedToDOM(...nodes) {
    if (document.body.contains(this)) {
        nodes.forEach((node) => {
            if (!node.isAddedToDom) {
                node.dispatchEvent(new Event(Events.ADDED_TO_DOM));
            }
        });
    }
    else {
        const handler = () => {
            this.stopListenEvent(Event.ADDED_TO_DOM, handler);
            Array.from(this.children).forEach((child) => {
                if (!child.isAddedToDom) {
                    child.dispatchEvent(new Event(Events.ADDED_TO_DOM));
                }
            });
        };
        this.listenEvents(new EventListener(this, Events.ADDED_TO_DOM, handler));
    }
};
//# sourceMappingURL=CustomElement.js.map