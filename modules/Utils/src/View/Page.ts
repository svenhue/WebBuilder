import { BaseServiceProvider } from '../Services/Provider/BaseServiceProvider.js';
import { IPageConfiguration } from './IPageConfiguration.js';
import { Ref, ref } from 'vue';
import { DataContextManager } from '../Data/StateManagement/DataContextManager.js';
import { ContextLevel } from '../Data/StateManagement/ContextLevel.js';
import { IViewConfiguration } from './IViewConfiguration.js';
import { Router, RouteRecordRaw } from 'vue-router';

export class Page{

    public config: Ref<IPageConfiguration>;
    private templateRef: Ref<HTMLElement>;
    private router: Router
    private resolver: object

    constructor(config: IPageConfiguration, templateRef: Ref<HTMLElement>, router: Router, resolver: object){
        this.config = ref(config);
        this.router = router;
        this.templateRef = templateRef;
        this.resolver = resolver;
       
        this.setup();
        
    }

    private setup(){   
        const {service, contextid} = BaseServiceProvider.ServiceWithAppContext<DataContextManager>("DataContextManager", 0)
        const pageContext = service.NewContext(contextid, ContextLevel.State)
        this.config.value.contextid = pageContext.contextid

        //this.AddClientSideRoutes(this.config.value.children)
    }

    private AddClientSideRoutes(views: Array<IViewConfiguration>){
        
        if(views == undefined){
            return;
        }
        for(const view of views){
            if(view?.isRoutable == true){
                const record = {
                    path: view.route?.path,
                    name: view.route?.name,
                    component: this.resolver.resolveComponent(view)
                }as RouteRecordRaw
                this.router.addRoute('root', record)
            }
        }
    }
    


}