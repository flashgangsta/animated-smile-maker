export class EventListener {
    private target:HTMLElement | undefined;
    private type:string | undefined;
    private handler:EventListenerOrEventListenerObject | undefined;
    private options: boolean | AddEventListenerOptions | undefined;
    constructor(target:HTMLElement, type:string, handler:EventListenerOrEventListenerObject, options?:boolean | AddEventListenerOptions) {
        this.target = target;
        this.type = type;
        this.handler = handler;
        this.options = options;

        target.addEventListener(type, handler, options);
    }


    getType():string | undefined {
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