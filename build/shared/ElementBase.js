export class ElementBase extends HTMLElement {
    eventListeners = [];
    constructor() {
        super();
    }
    listenEvents(...eventListeners) {
        this.eventListeners.push(...eventListeners);
    }
    stopListenEvents() {
        if (!this.eventListeners.length)
            return;
        this.eventListeners.forEach((eventListener) => eventListener.dispose());
        this.eventListeners = [];
    }
    stopListenEvent(target, type, handler) {
        if (!this.eventListeners.length)
            return;
        let eventsList;
        if (target) {
            eventsList = this.eventListeners.filter((listener) => listener.getTarget() === target);
        }
        else {
            eventsList = this.eventListeners;
        }
        if (type) {
            eventsList = eventsList.filter((listener) => listener.getType() === type);
        }
        if (handler) {
            eventsList = eventsList.filter((listener) => listener.getHandler() === handler);
        }
        eventsList.forEach((listener) => {
            const index = this.eventListeners.indexOf(listener);
            this.eventListeners.splice(index, 1);
            listener.dispose();
        });
    }
    removeChildren() {
        Array.from(this.children).forEach((child) => {
            child.remove();
        });
    }
    remove() {
        this.stopListenEvents();
        this.removeChildren();
        super.remove();
    }
    connectedCallback() {
        dispatchEvent(new Event("ADDED_TO_DOM" /* Events.ADDED_TO_DOM */));
    }
    disconnectedCallback() {
        this.remove();
        dispatchEvent(new Event("REMOVED_FROM_DOM" /* Events.REMOVED_FROM_DOM */));
    }
}
//# sourceMappingURL=ElementBase.js.map