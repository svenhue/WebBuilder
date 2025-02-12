import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export const useWebNodeTemplateStore = defineStore('webnodetemplates', {
  state: () => ({
    avaiblenodetemplates: markRaw<Array<object>>([]),

  }),
  getters: {
    getall(): Array<object>{
        return this.avaiblenodetemplates;
    },

  },
  actions: {
    addTemplates(templates: Array<object>){
        this.avaiblenodetemplates.push(...templates)
    }
  },
});
