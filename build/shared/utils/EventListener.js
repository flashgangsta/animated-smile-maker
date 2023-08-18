export class EventListener {
    target;
    type;
    handler;
    options;
    constructor(target, type, handler, options) {
        this.target = target;
        this.type = type;
        this.handler = handler;
        this.options = options;
        target.addEventListener(type, handler, options);
    }
    getTarget() {
        return this.target;
    }
    getType() {
        return this.type;
    }
    getHandler() {
        return this.handler;
    }
    dispose() {
        this.target.removeEventListener(this.type, this.handler, this.options);
        this.options = undefined;
    }
}
//# sourceMappingURL=EventListener.js.map