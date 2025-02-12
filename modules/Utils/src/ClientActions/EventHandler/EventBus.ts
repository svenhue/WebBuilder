import { SimpleNameValueCollection } from '../../Data/SimpleNameValueCollection.js';
import { IEventBusEntry } from './IEventBusEntry.js';
import { IEventHandler } from './IEventHandler.js';
import { IEventInvoker } from './IEventInvoker.js';
import { IUIEvent } from './IUIEvent.js';
import { UIEventTypes } from './UIEventTypes.js';
import { injectable } from 'inversify';
import { waitForElm } from '../../composables/useWaitforElement.js';

@injectable()
export class EventBus{

    public events: Array<IEventBusEntry>;
    constructor(){
        this.events = new Array<IEventBusEntry>();
    }

    public on(newevent: IUIEvent, handler: IEventHandler, args?: SimpleNameValueCollection){
        const event = this.events.find(x => x.event.id === newevent.id);
        
        let entry = undefined;
        if(event == undefined){
            entry = {
                event: newevent,
                handler: handler,
                args: args
            }
            this.events.push(entry);
        }
        if(newevent.type == UIEventTypes['domEvent'] && entry != undefined){
            
            this.RegisterDOMEvent(entry, args);
        }
        
    }
    public off(event: IUIEvent){
        const entry = this.events.find(x => x.event.id === event.id);
        if(entry == undefined){
            return;
        }
        
        if(event.type == UIEventTypes['domEvent']){
            this.DeleteDOMEvent(entry);
        }

        this.events.splice(this.events.indexOf(entry), 1);
        
    }
    public emit(sender: IEventInvoker, event: IUIEvent, args: SimpleNameValueCollection){
        
        const entry = this.events.find(x => x.event === event);
        if(entry){
            entry.handler.handleEvent(sender, event, args);
        }else{
            throw new Error('Event not registered');
        }
    }

    private RegisterDOMEvent(entry: IEventBusEntry, args: SimpleNameValueCollection){
        console.log(entry)
        
        waitForElm(`[data-element='${entry.event.targetElement}']`).then((el) => {
            console.log("new", entry)
            const controller = new AbortController();            
            el.addEventListener(entry.event.identifier, (e) => {
                this.emit(e, entry.event, args)
            },{
                signal:controller.signal
            });
            entry.abortController = controller;
        }) 
        
    }

    private DeleteDOMEvent(entry: IEventBusEntry){
        if(entry.abortController != undefined){
            entry.abortController.abort();
        }
        
    }
}