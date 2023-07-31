export class EventListener {
    constructor(target, type, handler, options) {
        this.target = target;
        this.type = type;
        this.handler = handler;
        this.options = options;
        target.addEventListener(type, handler, options);
    }
    getType() {
        return this.type;
    }
    getHandler() {
        return this.handler;
    }
    dispose() {
        if (this.target && this.type && this.handler) {
            this.target.removeEventListener(this.type, this.handler, this.options);
        }
        this.target = undefined;
        this.type = undefined;
        this.handler = undefined;
        this.options = undefined;
    }
}
//# sourceMappingURL=EventListener.js.map