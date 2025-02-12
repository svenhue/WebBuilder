import { ViewElement,IDataAdapter, UIActionFactory, BusinessObject,  GlobalStateProvider, SimpleNameValueCollection, DataAdapter} from "alphautils";
import { IViewConfiguration } from "alphautils";

//todo make this view editable in the editor - better ux
export class DialogViewElement extends ViewElement{

    private dataAdapter: IDataAdapter | undefined
    private actionFactory: UIActionFactory

    constructor(config: IViewConfiguration/* todo custom config */){
        super(config);

        if(this.dataAdapter == undefined){
            const config = {
                contextId:  (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().contextid,
                boType: new BusinessObject({
                    name : "ViewConfiguration"
                })
            }
            this.dataAdapter = new DataAdapter(config)
        }
        this.actionFactory = (this as unknown as {GetService (string: string) : UIActionFactory}).GetService('UIActionFactory');

        this.globalStateProvider = this.GetService<GlobalStateProvider>('GlobalStateProvider') as GlobalStateProvider;
        
        this.globalStateProvider.AddViewContext({
            viewId: this.GetConfiguration().publicidentifier,
            localActions: [{
                methodName: "ChangeVisibility",
                function: () => this.ChangeVisibility()
            }]
        })

    }   



    public ChangeVisibility(){
      
        if(this.dataAdapter == undefined){
            throw new Error("The dataAdapter service is not registered");
        }
        //todo dataadapter
        const config = this.GetConfiguration();
        
        const oldValue = config.modelValue;
        let newValue = undefined;
        if(oldValue == undefined || oldValue == false){
            newValue = true;
        }else{
            newValue = false;
        }
        const newValues = new SimpleNameValueCollection([{key: "modelValue", value: newValue}])
        this.dataAdapter.UpdatePartial(config.id, newValues, config.contextid, "ViewConfiguration")
    }
}