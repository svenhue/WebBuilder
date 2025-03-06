//@ts-ignore
//@ts-nocheck
import { BORepository, BusinessObject, DataAdapter, IPageConfiguration, IViewConfiguration, KeyValuePair, SimpleNameValueCollection } from "alphautils";
import { reactive, Ref, ref } from "vue";
import { interfaces } from "inversify";
import { ViewConfigurationService } from "../utils/Services/ViewConfigurationService";
import { set } from "lodash-es";
import { PageConfigurationHelper } from "../utils/Services/Development/PageConfigurationHelper";
import { PageModel } from "../Models/PageModel";

//@injectable()
export class ApplicationPageViewModel{

 
    public role: Ref<string> 
    public contextid: number
    public model: PageModel
    private dataAdapter: DataAdapter
    private boType = new BusinessObject({
        name: 'Page',
        propertys: []
    })
    private viewservice: ViewConfigurationService
    private viewDataAdapter: DataAdapter
    

    constructor(
        page: IPageConfiguration,
        dataAdapterConstructor: interfaces.Newable<DataAdapter>,
        viewService: ViewConfigurationService,
        container,
        addToHistory = true){
        this.viewservice = viewService
        this.dataAdapter = new dataAdapterConstructor({
            boType: this.boType,
            persistLocalStorage: true,
            contextId: 0 // the root context has always the id = 0
        }, 0, container)
        
        const npage = this.dataAdapter.Create(page, undefined, addToHistory) as unknown as IPageConfiguration 
        this.model = reactive(new PageModel(npage))
        this.model.views = []
        this.contextid = npage.contextid
        this.role = ref(page.role)

        this.viewDataAdapter = new dataAdapterConstructor({
            boType: new BusinessObject({
                name: 'ViewConfiguration',
                propertys: []
            }),
            persistLocalStorage: true,
            contextId: this.contextid
        },this.contextid, container)

        for(const view of JSON.parse(JSON.stringify(npage.views))){
            const initView = this.viewservice.Create(view.type, view, view.parentId, false, undefined, false, npage.views)
            for(const v of initView){
                const newV = this.viewDataAdapter.Create(v, this.contextid, addToHistory) as unknown as IPageConfiguration
                this.model.views.push(newV)
            }
        }
        console.log(this.model)
    }
    private AddNestedViews(views: Array<IViewConfiguration>){
    
    }
    private RegisterNestedViews(views: Array<IViewConfiguration>): Array<IViewConfiguration>{
        
    }
    public AddView(view: IViewConfiguration, commitHistory = true, addToHistory = true){
        const newView = this.viewDataAdapter.Create(view, this.contextid, addToHistory)
      
        this.model.views.push(newView) 
        if(commitHistory){
            this.viewDataAdapter.CommitHistory()
        }
        return newView;
    }

    public UpdateView(id: number, view: IViewConfiguration, oldValue?: IViewConfiguration, commitHIstory = true, addToHistory = true){
        const newv = this.viewDataAdapter.Update(id, view, this.contextid, oldValue, addToHistory)
        const i = this.model.views.findIndex(v => v.id == id)
        if(i == undefined){
            throw new Error('No view with id ' + id + ' found')
        }
        this.model.flatterndViews[i] = newv
        if(commitHIstory){
            this.dataAdapter.CommitHistory()
        }
        return [true, newv];
    }
    public PartialUpdateView(
        id, 
        values: SimpleNameValueCollection, 
        oldValue?: IViewConfiguration,
        commitHistory = true,
        addToHistory = true    
    ){
        let view = this.model.views.find(v => v.id == id)
        //problem: when the state changed after the history stack entry, undo will resume in incorrect state
        //todo if array, remove/ add only the double values
        BORepository.MergeKeyValueCollection(values.keyValuePairs, view)
        
        this.viewDataAdapter.UpdatePartial(id, values, this.contextid, undefined, oldValue, addToHistory)

        if(commitHistory){
            this.viewDataAdapter.CommitHistory()
        }
        return [true]
    }
    public DeleteView(id: number, commitHistory = true, addToHistory = true){
        
        const i = this.model.views.findIndex(v => v.id == id)
        if(i == undefined){
            throw new Error('No view with id ' + id + ' found')
        }
        this.viewDataAdapter.UpdatePartial(this.model.views[i].id, new SimpleNameValueCollection([{key: 'properties.isActive', value: false}]), undefined, undefined, [{key: 'properties.isActive', value: undefined}], addToHistory)
        //setTimeout(() => {
            this.viewDataAdapter.Delete(this.model.views[i], this.contextid, addToHistory)
            this.model.views.splice(i, 1)

            if(commitHistory){
                this.viewDataAdapter.CommitHistory()
            }
        //}, 10)
        return [true]
        
    }
    public DeletePage(){
        this.dataAdapter.Delete(this.model, this.contextid)

        for(const view of this.model.flatterndViews){
            this.viewDataAdapter.UpdatePartial(view.id, new SimpleNameValueCollection([{key: 'properties.isActive', value: false}]))
        }
    }
    public UpdatePage(values: Array<KeyValuePair>){
        for(const pair of values){
            set(this.model, pair.key, pair.value)
        }
        this.dataAdapter.UpdatePartial(this.model.id, new SimpleNameValueCollection(values), this.contextid)
    }
    public PreparePageConfig(){
        
        /*
        for(const view of this.model.flatterndViews){
            this.model.views.push(view)
        }
        */

        PageConfigurationHelper.validatePage(this.model)
    }
}