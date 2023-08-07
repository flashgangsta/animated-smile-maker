import {Events} from "../lib/Events";

export class EventListener {
    private target:EventTarget | undefined;
    private type:Events | undefined;
    private handler:EventListenerOrEventListenerObject | undefined;
    private options: boolean | AddEventListenerOptions | undefined;
    constructor(target:EventTarget, type:Events, handler:EventListenerOrEventListenerObject, options?:boolean | AddEventListenerOptions) {
        this.target = target;
        this.type = type;
        this.handler = handler;
        this.options = options;

        target.addEventListener(type, handler, options);
    }


    getType():Events | undefined {
        return this.type;
    }

    getHandler():EventListenerOrEventListenerObject | undefined {
        return this.handler;
    }

    dispose():void {
        if(this.target && this.type && this.handler) {
            this.target.removeEventListener(this.type, this.handler, this.options);
        }

        this.target = undefined;
        this.type = undefined;
        this.handler = undefined;
        this.options = undefined;
    }
}