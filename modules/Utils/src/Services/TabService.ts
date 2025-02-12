//@ts-ignore
import { injectable } from 'inversify';
import { ComputedRef, Ref, computed, ref } from 'vue';


@injectable()
export class TabService{
    
    public tabs: Ref<Array<{name: string, title: string}>>
    private navigationHandler: (tab: object) => void;
    private activeTab: Ref<{name: string, title: string}>
    constructor(){
        this.tabs = ref<Array<{name: string, title: string}>>([])
        this.activeTab  = ref({name: "", title: ""});
        console.log(123)
    }
    
    public ActiveTab: ComputedRef<{name: string, title: string}> = computed(() => {
        return this.activeTab.value;
    })
    public AddAndOpenTab(tab: {name: string, title: string}){
        
        this.AddTab(tab);
        this.OpenTab(tab);
    }

    public AddTab(newTab: {name: string, title: string}){
        this.tabs.value.push(newTab);
    }

    public OpenTab(tab: object){
        console.log("Opening tab", tab)
        if(this.navigationHandler == undefined){
            throw new Error("Navigation handler not set")
        }
        this.navigationHandler(tab);
       
        this.activeTab.value = tab;
    }

    public GetTabs(): ComputedRef<Array<{name: string, title: string}>>{
        return computed(() => {
            return this.tabs.value;
        })
    }

    public SetNavigationHandler(navigationHandler: (tab: object) => void){      
        this.navigationHandler = navigationHandler;
    }
}