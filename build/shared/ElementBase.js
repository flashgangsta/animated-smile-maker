export class ElementBase extends HTMLElement {
    constructor() {
        super();
        this.draggable = false;
    }
    listenEvents(...eventListeners) {
        if (!this.eventListeners)
            this.eventListeners = [];
        this.eventListeners.push(...eventListeners);
    }
    stopListenEvents() {
        if (!this.eventListeners)
            return;
        this.eventListeners.forEach((eventListener) => eventListener.dispose());
        this.eventListeners = undefined;
    }
    stopListenEvent(type, handler) {
        if (!this.eventListeners || !this.eventListeners.length)
            return;
        const listenersByType = this.eventListeners.filter((listener) => listener.getType() === type);
        let result;
        if (handler) {
            result = listenersByType.filter((listener) => listener.getHandler() === handler);
        }
        else {
            result = listenersByType;
        }
        result.forEach((listener) => {
            // @ts-ignore
            const index = this.eventListeners.indexOf(listener);
            // @ts-ignore
            this.eventListeners.splice(index, 1);
            listener.dispose();
        });
        if (!this.eventListeners.length) {
            this.eventListeners = undefined;
        }
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