
import { useCreatorStore } from '../stores/useCreatorStore.js'
import { SolutionObject } from '../Data/SolutionObject.js'
import { useWebNodeStore } from '../stores/useWebNodeStore.js';
import { getActivePinia } from 'pinia';
export function useSolutionService(){

    function create(solution: SolutionObject){
        const envcontext = useWebNodeStore(getActivePinia()).addWebNodeContext('environment');  
        solution.sessioncontextid = envcontext;
        useCreatorStore().addCreation(solution);
        return envcontext;
    }
    return {
        create
    }
}