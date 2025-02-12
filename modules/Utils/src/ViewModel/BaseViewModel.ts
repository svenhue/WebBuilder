import { IDataAdapter } from '../Data/DataAdapters/IDataAdapter.js';
import { IBOInstance } from '../Data/IBOInstance.js';
import { StateChangeTypes } from '../Data/Repositorys/StateChangeTypes.js';
import { SyncStateModes } from '../Data/StateManagement/SyncStateModes.js';
import { IViewDataConfiguration } from '../View/ViewDataConfiguration.js';
import { DataAdapter } from '../Data/DataAdapters/DataAdapter.js';
import { DataAdapterOptions } from '../Data/DataAdapters/DataAdapterOptions.js';
import { Container } from 'inversify';
import { BOService } from '../Services/BOService.js';
import { BaseServiceProvider } from '../Services/Provider/BaseServiceProvider.js';
import { IViewConfiguration } from '../View/IViewConfiguration.js';
import { KeyValuePair } from '../Data/KeyValuePair.js';
import { SimpleNameValueCollection } from '../Data/SimpleNameValueCollection.js';

export class BaseViewModel {

  dataAdapter: IDataAdapter;
  sessioncontextid: number;
  config: IViewDataConfiguration;
  private boService: BOService;
  private container: Container;
  private syncStateMode: SyncStateModes;
  constructor(contextid: number, syncstateMode?: SyncStateModes){
   
    this.syncStateMode = syncstateMode;
    this.sessioncontextid = contextid;
    const boService = new BaseServiceProvider().GetService<BOService>('BOService', contextid)  
    this.boService = boService
    this.CreateBOAdapter({boType:{name:'ViewConfiguration'},contextId: contextid}, contextid)
  }
  Id(bo: IBOInstance){
    return this.boService.NewId(bo)
  }
  CreateAndReturnBOAdapter(options: DataAdapterOptions, contextid?: number){
    return new DataAdapter(options, contextid)
  }

  public CreateBOAdapter(options: DataAdapterOptions, contextid?: number){
    this.dataAdapter = new DataAdapter(options, contextid) 
  }

  public PatchStateUpdate(newValue: IBOInstance, changeType: StateChangeTypes, force = false){

    if(this.config == undefined || this.config.syncStateMode == undefined) {
      return;
    }
    if(this.config.syncStateMode == SyncStateModes.immediate
        || ( this.config.syncStateMode == SyncStateModes.manual && force == true))
    {
      switch(changeType){
        case StateChangeTypes.create:
          this.dataAdapter.Create(newValue)
          break;
        case StateChangeTypes.update:
          this.dataAdapter.Update(newValue.id, newValue)
          break;
        case StateChangeTypes.delete:
          this.dataAdapter.Delete(newValue)
          break;
      }
    }
  }

  public PatchStateUpdatePartial(viewId: number, values: KeyValuePair){
    this.dataAdapter.UpdatePartial(viewId, new SimpleNameValueCollection([values]), this.sessioncontextid)
  }


  public UseService<TService>(serviceName: string){
    const service = this.container.get<TService>(serviceName) as TService
    return service;
  }

  public Subscribe(handler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes, oldValue?: IBOInstance) => void){
    this.dataAdapter.SetStateChangeHandler(handler)
  }

  public PartialUpdate(view: IViewConfiguration, values: KeyValuePair){

    this.dataAdapter.UpdatePartial(view.id, new SimpleNameValueCollection([values]), this.sessioncontextid)
  }
  public Dispose(){
    this.dataAdapter?.Unsubscribe()
  }
}
