//@ts-nocheck
import { SolutionObject } from '../Data/SolutionObject.js';
import { defineStore } from 'pinia';

export const useCreatorStore = defineStore('creator',{

    state: () => ({
        creations: Array<SolutionObject>(),
        avaiblecreationtypes: [
            {
                name: 'diagram',
                subtypes: [
                    {
                        name: 'Dont specify notation',
                        suffix: 'diagram'
                    },
                    {
                        name: 'Business Process Modelling Notation (bpmn)',
                        suffix: 'bpmn'
                    },
                    {
                        name: 'Unified Modelling Language (uml)',
                        suffix: 'uml'
                    },
                    {
                        name: 'Entity Relationship Diagram (erm)',
                        suffix: 'erm'
                    },
                    {
                        name: 'Decision Model (dmn)',
                        suffix: 'dmn'
                    },
                ]
            },
        ],
        avaiblenotations: [
            {name: 'bpmn'},
        ],

    }),
    getters: {
        getSubTypeNames: (state) => {   
            return state.avaiblecreationtypes.map(t => t.subtypes.map(s => s.name)).flat()
        },
        getallCreations: (state) => {
            return state.creations
        },
        getActiveCreations: (state) => {
            return state.creations.filter(c => c.active)
        },
        getSolutionByContext: (state) => {
            return (context: number) => {
                return state.creations.find(c => c.sessioncontextid == context)
            }
        }
    },
    actions: {
        addCreation(creation: SolutionObject){
            this.creations.push(creation)
        }
    
    }
})
