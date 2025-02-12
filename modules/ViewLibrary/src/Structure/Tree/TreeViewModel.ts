import { BaseViewModel } from "alphautils";
import { ref } from "vue";

export class TreeViewModel extends BaseViewModel{

    selected = ref<Array<object>>();
    expanded = ref<Array<object>>();
    ticket = ref<Array<string>>();

    constructor(contextid: number){
        super(contextid)
    }

    filter(node: {label: string}, filter: string){
        return node?.label.includes(filter);
    }

}