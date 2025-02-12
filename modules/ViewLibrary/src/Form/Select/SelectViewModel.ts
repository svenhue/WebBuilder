import { IViewModelUsageOptions } from 'alphautils';
import { BaseViewModel } from 'alphautils';
import { ref, Ref } from 'vue';

export class SelectViewModel extends BaseViewModel{
    options: Ref<Array<string>>;
    modelValue: object | string;

    constructor(config: IViewModelUsageOptions){
        super(config)
        this.options = ref(config.configuration.content.options);
        this.modelValue = ref(config.configuration.content.initialModelValue);
    }
}