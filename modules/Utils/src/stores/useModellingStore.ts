
//@ts-nocheck
import { defineStore, getActivePinia } from 'pinia';
import { nthIndex } from '../composables/getNthIndexofString.js';
import { useWebNodeStore } from './useWebNodeStore';
import { useCreatorStore } from './useCreatorStore';
import { SolutionObject } from '../Data/SolutionObject';
import { ViewElement } from '../View/ViewElement';
interface IFocussContextElements{
  contextid: number,
  elements: Array<number>
}
export const useModellingStore = defineStore('modellingstore', {
  state: () => ({
    focussedElements: [] as Array<IFocussContextElements>,
    registeredmodellingcontexts: [] as number[],
    currentcontext: -1 as number,
    currentAction: '',
  }),
  getters: {
    getScopedSolution(): SolutionObject | undefined{
      return useCreatorStore(getActivePinia()).getSolutionByContext(this.currentcontext);
    },
    getSolutionModel(): Array<ViewElement>{
      const solution = this.getScopedSolution
      return useWebNodeStore().getContextWebNodes(solution?.sessioncontextid).value?.filter(m => m.type.includes(solution.type));
    },
    getcurrentcontextid: (state) => {
      return state.currentcontext;
    },
    getcurrentcontext: (state) => {
      return useWebNodeStore().webnodecontexts.find((c) => c.contextid === state.currentcontext);
    },
    getavaibleNotations(): Array<string>{
      const types: Array<string> = [];
      this.getall.map((e) => 
        {
          if(e.type != undefined){
            const i = e.type?.indexOf(':')
            if(!types.includes(e.type.slice(0, i))){
              types.push(e.type.slice(0, i))
            }
          }
        }
      )
      return types;
    },
    getsubtypes(){
      return (type: string) => {
        const subtypes: Array<string> = [];
        this.getavaibleModellingElements.map((e) =>
          {
            if(e.type != undefined && e.type.includes(type)){
              let subtype = e.type.replace(type + ':', '')
              const lasti = subtype.indexOf(':')
              if(lasti != -1){
                subtype= subtype.slice(0, lasti)
              }
              if(!subtypes.includes(subtype)){
                subtypes.push(subtype)
              }
            }
          }
        )
        return subtypes;
      }
    },
    getmodell: () => {
      return (contextid: number) => {
        const store = useCreatorStore(getActivePinia())
        const notations = store.$state.avaiblenotations
        return useWebNodeStore().getContextWebNodes(contextid).value?.filter(n => {
            if(typeof n.type === 'string'){
              for(const s of notations){
                if(n.type.includes(s.name)){
                  return true
                }
              }
            }
            return false;
          })
      }
    },
    getFirstFocussedElement: (state) => {
      return ( contextid: number ) => {
        return useWebNodeStore().byId(contextid, state.focussedElements.find(c => c.contextid == contextid)?.elements[0]) as ViewElement;
    }},
    getfocussedElementsIds: (state) => {
      return ( contextid: number ) => {
        return state.focussedElements.find(c => c.contextid == contextid)?.elements;
      }
    },
    getfocussedElements: (state) => {
      return (contextid: number) => {
        const ids = state.focussedElements.find(c => c.contextid == contextid)?.elements;
        return useWebNodeStore().getContextWebNodes(contextid).value?.filter(n => ids?.includes(n.id));
      }
    },
    getTypeRelatedElements(){
      return (type: string, degree: number ) => {
        return this.getavaibleModellingElements.filter((element) => element.type?.includes(type.substring(0, nthIndex(type, ':', degree))));
      };
    }
  },
  actions: {

  },
});
