import { MaybeRefOrGetter, inject } from 'vue';
import { IViewConfiguration } from '../../View/IViewConfiguration.js';

export function useViewConfiguration(contextid: number, viewIdentifier: number, view: IViewConfiguration, ignoreError = false) : {view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<IViewConfiguration>>} {
  
    if(view != undefined){
        return {view: view, children: view.children}
    }

    const getter = inject('viewGetter_' + contextid ) as (viewId: number) => { view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<IViewConfiguration>>}
    if(getter == undefined){
        if(ignoreError){
            return {view: undefined, children: undefined}
        }else{
            throw new Error('ViewGetter not found')
        }
    }
    return getter(viewIdentifier);
}