//@ts-ignore
//@ts-nocheck
import { IViewConfiguration } from "alphautils";
import { injectable } from "inversify";
import { Ref, ref, computed } from "vue";

@injectable()
export class FocussedViewContextService{

    private focussedView: Ref<IViewConfiguration | undefined> = ref<IViewConfiguration | undefined>(undefined);
    private contextChangedSubscribers: Array<{handler: (old: number, newc: number)=> void}> = new Array<{handler: (old: number, newc: number)=> void}>();

    public contextid: number = 0;
    public hoveredView: Ref<IViewConfiguration | undefined> = ref<IViewConfiguration | undefined>(undefined);

    public Update: (id:number, view: IViewConfiguration) => void = () => {};
    public Delete: (id:number) => void = () => {};
    public GetAll: () => Array<IViewConfiguration>;

    public Get(){
        return computed(() => {
            
            if(typeof this.GetAll == 'function') 
                return this.GetAll() 
            else 
                return new Array<IViewConfiguration>();
        })
    }

    public GetHoveredView(){
        return computed(() => {
            return this.hoveredView.value;
        })
    }
    public GetApplicationTree(){

        const Get = (id: number) => { return this.Get().value?.find(v => v?.id == id) }
       return computed(() => {
            const focussed = this.GetFocussedView().value;
            if(focussed == undefined) {
                return new Array<IViewConfiguration>();
            }
            const views = this.Get();

            const rootElement = views.value.find(v => v?.isRoot == true);
            
            if(rootElement == undefined){
                return new Array<IViewConfiguration>();
            }


            function GetChildren(nodeId: number){
                const node = Get(nodeId);
                if(node == undefined){
                    return {}
                }
                const childrenCollection = node?.children?.find(c => c?.type == 'childrenCollection');
                const copy = JSON.parse(JSON.stringify(node));
                copy.children = childrenCollection?.value?.map((child) => { return GetChildren(child)} )
                return copy;
        
            }
            return [GetChildren(rootElement.id)];
        })
    }
    public GetTree(wihtoutParent = false, sortOrder = 'desc'){
        

        return computed (() => {
            let view = this.GetFocussedView().value;
            const views = this.Get();
            const result = new Array<IViewConfiguration>();
            
            if(view == undefined) return result;
            if(wihtoutParent == false){
                result.push(view);
            }
            let finished = false
            while(finished == false){
                
                const parent = views.value.find(c => c.id == view.parentId);
                if(parent != undefined && result.findIndex(x => x.id == parent.id) == -1){
                    result.push(parent);
                    view = parent;
                }else{
                    finished = true;
                    break;
                }
            }
        if(sortOrder == 'desc'){
            return result.reverse()
        }
        else{
            return result;
        }
        })
    }

    public SetGetter(getter: () => Array<IViewConfiguration>){
        this.GetAll = getter;
    }

    public SetFocussedView(view?: IViewConfiguration){
        this.focussedView.value = view;
    }
    public SetUpdateHandler(contextid: number, handler: (id:number, view: IViewConfiguration) => void){
        this.Update = handler;
        this.contextid = contextid;
    }
    public SetDeleteHandler(contextid: number, handler: (id:number) => void){
        this.Delete = handler;
        
        if(this.contextid != contextid){
            this.NotifyContextChanged(this.contextid, contextid);
        }
        
        this.contextid = contextid;
    }

    public GetFocussedView(){
        return computed(() => {
            return this.focussedView.value;
        })
    }
    public SubscribeContextChanged(handler: (old: number, newc: number)=> void){
        this.contextChangedSubscribers.push({handler: handler});
    }
    private NotifyContextChanged(oldcontextid: number, newcontextid: number){
        this.contextChangedSubscribers.forEach(sub => {
            sub.handler(oldcontextid, newcontextid);
        })
    }
}