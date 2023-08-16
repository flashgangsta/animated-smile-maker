import {Events} from "../lib/Events";

export class EventListener {
    private readonly target:EventTarget;
    private readonly type:Events;
    private readonly handler:EventListenerOrEventListenerObject;
    private options: boolean | AddEventListenerOptions | undefined;

    constructor(target:EventTarget, type:Events, handler:EventListenerOrEventListenerObject, options?:boolean | AddEventListenerOptions) {
        this.target = target;
        this.type = type;
        this.handler = handler;
        this.options = options;

        target.addEventListener(type, handler, options);
    }


    getTarget(): EventTarget {
        return this.target;
    }

    getType(): Events {
        return this.type;
    }

    getHandler(): EventListenerOrEventListenerObject {
        return this.handler;
    }

    dispose():void {
        this.target.removeEventListener(this.type, this.handler, this.options);
        this.options = undefined;
    }
}