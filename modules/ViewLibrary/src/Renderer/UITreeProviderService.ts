import { Ref, computed, provide, ref, watch } from "vue";
import { StateChangeTypes } from 'alphautils';
import { DataAdapter } from 'alphautils';
import { DataAdapterOptions } from 'alphautils';
import { BusinessObject } from 'alphautils';
import { IViewConfiguration, IBOInstance } from 'alphautils';
import { BaseServiceProvider } from 'alphautils';
import { set } from 'lodash-es'
import { getCurrentInstance } from "vue";
import { IPageConfiguration } from "alphautils/view/IPageConfiguration.ts";
import { IDataAdapter } from "alphautils";
/*
import { StateChangeTypes } from 'alphautils/data/Repositorys/StateChangeTypes.ts';
import { DataAdapter } from 'alphautils/data/DataAdapters/DataAdapter.ts';
import { DataAdapterOptions } from 'alphautils/data/DataAdapters/DataAdapterOptions.ts';
import { BusinessObject } from 'alphautils/data/BusinessObject.ts';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';
import { BaseServiceProvider } from 'alphautils/services/Provider/BaseServiceProvider.ts';

*/

export class UITreeProviderService extends BaseServiceProvider{

    private dataAdapter: IDataAdapter
    private contextid: number
    private flatViews: Ref<Array<IViewConfiguration>> = ref<Array<IViewConfiguration>>([])
    
    constructor(
        contextid: number,
        initialView: IViewConfiguration | Array<IViewConfiguration>
    ){
        super(contextid)
        this.contextid = contextid;
        const instance = getCurrentInstance()
        instance.appContext.app.provide('viewGetter_' + this.contextid,  (id: number ) => this.Getter(id))
       
        if(initialView == undefined){
            return
        }
        if(Array.isArray(initialView)){
            this.flatViews.value.push(...initialView)
            this.AddNestedChildren(initialView)
         
        }else if(initialView.children != undefined){

            this.flatViews.value.push(initialView)
            this.AddNestedChildren([initialView])
        }else{
            this.flatViews.value.push(initialView)
        }

        //if its a page add the child views
        for(const view of this.flatViews.value){
            if(view?.views != undefined){
                for(const v in view.views){
                    this.flatViews.value.push(view.views[v])
                }
                view.views = undefined;
            }
        }

        if(this.flatViews.value == undefined){
            this.flatViews.value = []
        }
        
        watch(this.flatViews, (newValue) => {
            console.log(newValue)
        })
        
    }

    // children are ROUTABLE views
    private AddNestedChildren(views: Array<IViewConfiguration | IPageConfiguration>){
        for(const view of views){
            if(view.children != undefined){
                this.flatViews.value.push(...view.children)
                this.AddNestedChildren(view.children)
            }
        }
    }
    public GetRootView(): Ref<IViewConfiguration>{
        return computed(() => {
            return this.flatViews.value.find(v => v.isRoot == true)
        })
    }
    //todo make this more performant!?
    public Getter(id: number){
        const view = computed(() => {
            return this.flatViews.value.find(v => v.id == id)
        })
        const children = computed(() => {
            const collection = view.value.children?.find(c => c?.type == 'childrenCollection')
            if(collection == undefined){
                return []
            }
            return this.PrepareViews(this.flatViews.value.filter(v => collection.value?.includes(v.id) ))
        })
        return { view: view, children: children}
    }

    subscribeToViewContextChanges(contextid: number){
        const options = new DataAdapterOptions({
            boType: new BusinessObject({
                name: 'ViewConfiguration'
            }),
            subscribe: {
                scope: "allOfBOType"
            },

            contextId: this.flatViews.value[0] != undefined ?  this.flatViews.value[0].contextid : '0', 
        })
        this.dataAdapter = new DataAdapter(options, contextid)
        const handler = (id: number, newValue: IBOInstance, changeType: StateChangeTypes) => this.HandleStateChange(id, newValue, changeType)
        this.dataAdapter.SetStateChangeHandler(handler)
        
    }
    private HandleStateChange(id:number, newValue: IBOInstance, changeType: StateChangeTypes){
        if(changeType == StateChangeTypes.create){
            const view = newValue as IViewConfiguration
            this.flatViews.value.push(view)
        }
        if(changeType == StateChangeTypes.delete){
            const view = newValue as IViewConfiguration
            const index = this.flatViews.value.findIndex(v => v.id == view.id)
            this.flatViews.value.splice(index, 1)
        }
        if(changeType == StateChangeTypes.update){
            const view = newValue as IViewConfiguration
            const index = this.flatViews.value.findIndex(v => v.id == view.id)
            this.flatViews.value[index] = view
        }
        if(changeType == StateChangeTypes.updatePartial){
            const i = this.flatViews.value.findIndex(v => v.id == id)
            const view = this.flatViews.value[i]
            for(const keyValuePair of newValue.keyValuePairs){
                set(view, keyValuePair.key, keyValuePair.value)
            }
        }
    }
    private PrepareViews(views: Array<IViewConfiguration>){

        return this.sortViews(this.FilterChildren(views))
    }
    private FilterChildren(views: Array<IViewConfiguration>){
        return views.filter(v => v.properties?.isActive != false)
    }
    private sortViews(views: Array<IViewConfiguration>){

        return views.sort((a, b) => {
            // If position is undefinded for a or b, place it at the end
            if (a.position === undefined) return 1;
            if (b.position === undefined) return -1;
            // If position is defined for both, parse them to floats and compare
            return a.position - b.position;
        });
    }

}