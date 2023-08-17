import {Events} from "./lib/Events";
import {EventListener} from "./utils/EventListener.js";

export class ElementBase extends HTMLElement {
    private eventListeners:EventListener[] = [];

    constructor() {
        super();
    }

    public listenEvents(...eventListeners:EventListener[]):void {
        this.eventListeners.push(...eventListeners);
    }

    public stopListenEvents():void {
        if(!this.eventListeners.length) return;
        this.eventListeners.forEach((eventListener:EventListener) => eventListener.dispose());
        this.eventListeners = [];
    }


    public stopListenEvent(target?:EventTarget, type?:Events, handler?:EventListenerOrEventListenerObject):void {
        if(!this.eventListeners.length) return;

        let eventsList:EventListener[];

        if(target) {
            eventsList = this.eventListeners.filter((listener: EventListener): boolean => listener.getTarget() === target);
        } else {
            eventsList = this.eventListeners;
        }

        if(type) {
            eventsList = eventsList.filter((listener: EventListener): boolean => listener.getType() === type);
        }

        if(handler) {
            eventsList = eventsList.filter((listener :EventListener): boolean => listener.getHandler() === handler);
        }

        eventsList.forEach((listener:EventListener):void => {
            const index:number = this.eventListeners.indexOf(listener);
            this.eventListeners.splice(index, 1);
            listener.dispose();
        });
    }


    public removeChildren():void {
        Array.from(this.children).forEach((child:Element):void => {
            child.remove();
        });
    }


    public remove():void {
        this.stopListenEvents();
        this.removeChildren();
        super.remove();
    }

    public connectedCallback():void {
        dispatchEvent(new Event(Events.ADDED_TO_DOM));
    }

    public disconnectedCallback():void {
        this.remove();
        dispatchEvent(new Event(Events.REMOVED_FROM_DOM));
    }
}