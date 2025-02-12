//@ts-ignore
import { Container, injectable } from "inversify";
import { inject } from "vue";

@injectable()
export class BaseServiceProvider{
    
    private container: Container
    private contextid: number;
    constructor(contextid?: number){
        this.contextid = contextid


    }
    public GetService<T>(serviceIdentifier: symbol | string | NewableFunction, contextid?: number): T{
            if(this.container == undefined){
                if(contextid != undefined){
                    this.container = inject('iotcontainer_'+ contextid, undefined) as Container;
                }else{
                    this.container = inject('iotcontainer_'+ this.contextid, undefined) as Container;
                }
            }
            if(this.container == undefined){
            return BaseServiceProvider.GetContainer(contextid != undefined ? contextid : this.contextid).get<T>(serviceIdentifier)
            }
       
         return this.container.get<T>(serviceIdentifier)
    }

    public static Service<T>(serviceIdentifier: string ): T {
        //the root context has already the id = 0
        const container = inject('iotcontainer_0',undefined) as Container;
        return container?.get<T>(serviceIdentifier) as T;
    }
    public static ServiceWithContext<T>(serviceIdentifier: string, contextid: number): T {
        let container = inject('iotcontainer_'+ contextid,undefined) as Container;
        if(container == undefined){
            container = BaseServiceProvider.GetContainer(contextid);
        }
        return container.get<T>(serviceIdentifier) as T;
    }
    public static GetContainer(contextid: number){
        let container = inject('iotcontainer_'+ contextid, undefined) as Container;
       
        if(container == undefined){
            for(let i = contextid; i <= contextid; i-- ){
                container = inject('iotcontainer_'+ i, undefined) as Container;

                // this must be ap application level context!
                if(container != undefined){
                    return container;
                }
            }
        }
        if(container == undefined){
            throw new Error('No iot container found for appcontext: ' + contextid)
        }
        return container;
    }
    public static ServiceWithAppContext<T>(serviceIdentifier: string, contextid?: number): {service: T, contextid: number} {
        let container = inject('iotcontainer_'+ contextid, undefined) as Container;
   
        if(container == undefined){
            for(let i = contextid; i <= contextid; i-- ){
                container = inject('iotcontainer_'+ i, undefined) as Container;

                // this must be ap application level context!
                if(container != undefined){
                    return {service: container.get<T>(serviceIdentifier), contextid: i} as { service: T, contextid:number };
                }
            }
        }
        return {service: container.get<T>(serviceIdentifier) as T, contextid: contextid};
    }
}