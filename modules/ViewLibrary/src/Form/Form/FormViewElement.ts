import { ViewElement } from "alphautils";
import { IViewElement } from "alphautils";
import { DataSources, IDataAdapter } from 'alphautils'
import { Ref } from "vue";
import  QForm  from "quasar/src/components/form/QForm.js";
import { FormViewModel } from "./FormViewModel.js";
import { GlobalStateProvider } from "alphautils/data/StateManagement/GlobalStateProvider.ts";
export class FormViewElement extends ViewElement{
    
    private ref: Ref<typeof QForm>;
    public datasource: DataSources;
    private viewModel: FormViewModel;

    constructor(view: IViewElement, ref: Ref<typeof QForm>, viewModel: FormViewModel){
        super(view);
        this.ref = ref;
        this.viewModel = viewModel;

        this.globalStateProvider = this.GetService<GlobalStateProvider>('GlobalStateProvider') as GlobalStateProvider;
        
        this.globalStateProvider.AddViewContext({
            viewId: this.GetConfiguration().publicidentifier,
            localActions: [{
                methodName: "Clear",
                function: () => this.Clear()
            }]
        })

    }
    //todo
    public Submit(){

    }

    public Clear(){
        const children = this.GetConfiguration()?.children;

        if(children == undefined){
            return;
        }

        for(const childId of children[0]?.value){
            this.viewModel.PatchStateUpdatePartial(childId, {key: 'modelValue', value: undefined})
        }
    }
    public Reset(){
        this.ref.value?.reset()
    }
    public Validate(){
        this.ref.value?.validate()
    }
    public SetData(){
        
    }
    public ResetValidation(){
        this.ref.value?.resetValidation()
    }

    
}