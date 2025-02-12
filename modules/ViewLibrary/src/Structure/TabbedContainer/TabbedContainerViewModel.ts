import { BaseViewModel, IViewConfiguration } from 'alphautils';
import { ref, watch } from 'vue';

export class TabbedContainerViewModel extends BaseViewModel{
    
    activeTab = ref<string>();
    viewconfig: IViewConfiguration;
    constructor(config: IViewConfiguration){
        super(config.contextid);
        this.viewconfig = config;

        if(this.viewconfig.modelValue != undefined){
            this.activeTab.value = this.viewconfig.modelValue;
        }else{
            this.activeTab.value = '';
        }

    }
}