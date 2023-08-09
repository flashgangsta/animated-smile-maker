import {Events} from "./lib/Events";
import {EventListener} from "./utils/EventListener.js";

export class ElementBase extends HTMLElement {
    private eventListeners:EventListener[] | undefined;

    constructor() {
        super();
    }

    listenEvents(...eventListeners:EventListener[]):void {
        if(!this.eventListeners) this.eventListeners = [];
        this.eventListeners.push(...eventListeners);
    }

    stopListenEvents():void {
        if(!this.eventListeners) return;
        this.eventListeners.forEach((eventListener:EventListener) => eventListener.dispose());
        this.eventListeners = undefined;
    }


    stopListenEvent(type:string, handler:EventListenerOrEventListenerObject):void {
        if(!this.eventListeners || !this.eventListeners.length) return;

        const listenersByType:EventListener[] = this.eventListeners.filter(
            (listener:EventListener):boolean => listener.getType() === type
        );

        let result;

        if(handler) {
            result = listenersByType.filter(
                (listener:EventListener):boolean => listener.getHandler() === handler
            );
        } else {
            result = listenersByType;
        }

        result.forEach((listener:EventListener):void => {
            // @ts-ignore
            const index:number = this.eventListeners.indexOf(listener);
            // @ts-ignore
            this.eventListeners.splice(index, 1);
            listener.dispose();
        });

        if(!this.eventListeners.length) {
            this.eventListeners = undefined;
        }
    }


    removeChildren():void {
        Array.from(this.children).forEach((child:Element):void => {
            child.remove();
        });
    }


    remove():void {
        this.stopListenEvents();
        this.removeChildren();
        super.remove();
    }

    connectedCallback():void {
        dispatchEvent(new Event(Events.ADDED_TO_DOM));
    }

    disconnectedCallback():void {
        this.remove();
        dispatchEvent(new Event(Events.REMOVED_FROM_DOM));
    }
}