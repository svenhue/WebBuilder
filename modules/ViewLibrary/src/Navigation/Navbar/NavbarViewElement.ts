import { Screen, DataAdapter, IUIEvent, IEventInvoker, ViewElement, BusinessObject, SimpleNameValueCollection, DataAdapterOptions, UIActionFactory, IUIAction} from 'alphautils';
import { IViewConfiguration } from 'alphautils';
import { MaybeRefOrGetter } from 'vue';
export class NavbarViewElement extends ViewElement{


    private dataAdapter: DataAdapter
    private actionFactory: UIActionFactory

    constructor(config: MaybeRefOrGetter<IViewConfiguration>){
        super(config);
        
        //this.ListenOnScreenChanges();
        this.actionFactory = (this as unknown as {GetService (string: string) : UIActionFactory}).GetService('UIActionFactory') as UIActionFactory
        if(this.dataAdapter == undefined){
            const config = new DataAdapterOptions({
                contextId: (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().contextid,
                boType: new BusinessObject({
                    name : "ViewConfiguration"
                })
            })
            this.dataAdapter = new DataAdapter(config)
        }
        
    }

    
    

    public handleEvent(sender:IEventInvoker, event: IUIEvent, args: SimpleNameValueCollection){
        const action = (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().interaction.actions.find(a => a.identifier == event.actionIdentifier);
         
        if(action == undefined){
            throw new Error(`Action ${event.actionIdentifier} not found`);
        }
        
        //todo error: TS2339: Property 'GetConfiguration' does not exist on type 'NavbarViewElement'
        const actionInstance = (this as unknown as {CreateAction: (options: object) => (action: IUIAction) => IUIAction}).CreateAction(action.name);
        switch(action.name){
           
        }

    }
    private HideChildren(){
        const children = (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().children.find(c => c.type == 'childrenCollection')?.value;

        if(children != undefined && children.length > 0){
            for(const child of children.filter(c => c.specifications?.noOverrideStyle != true)){
                this.dataAdapter.UpdatePartial(child, new SimpleNameValueCollection([{key: "style.display", value: 'none'}]),  (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().contextid, "ViewConfiguration")
            }
        }
    }
    private ShowChildren(){
        const children =(this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().children.find(c => c.type == 'childrenCollection')?.value;

        if(children != undefined && children.length > 0){
            for(const child of children.filter(c => c.specifications?.noOverrideStyle != true)){
                this.dataAdapter.UpdatePartial(child, new SimpleNameValueCollection([{key: "style.display", value: ''}]),  (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().contextid, "ViewConfiguration")
            }
        }
    }
    private HandleScreenChange(screenWidth: number){
        const breakpoint = (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().properties?.itemsVisbilityBreakpoint ?? 900;
        if(breakpoint >= screenWidth){
            this.HideChildren();
        }else{
            this.ShowChildren();
        }
    }
    private ListenOnScreenChanges(){
        const screen =(this as unknown as {GetService (string: string) : Screen}).GetService('Screen') as Screen; // todo for dev the screen size changes has to be simulated

        screen.Subscribe((width: number) => this.HandleScreenChange(width))
    }

}