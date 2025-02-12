import {ViewConfiguration} from './ViewConfiguration.js';
import {Ref, MaybeRefOrGetter, toValue} from 'vue';
import { BaseServiceProvider } from '../Services/Provider/BaseServiceProvider.js';


export class BaseView extends BaseServiceProvider
  {

  public config: MaybeRefOrGetter<ViewConfiguration>;
  public templateRef:  Ref<HTMLElement>

  constructor(config: MaybeRefOrGetter<ViewConfiguration>) {
    super(toValue(config)?.contextid);
    this.config = config;
    
    const rawConfig = this.GetConfiguration();

    if(rawConfig.id == undefined){
      throw new Error('ViewConfiguration id is undefined');
    }
    if(rawConfig.contextid == undefined){
      throw new Error('ViewConfiguration contextid is undefined');
    }
  }

  public GetConfiguration(): ViewConfiguration{
    return toValue(this.config);
  }

  public getTemplateRef(): Ref<HTMLElement>{
    return this.templateRef;
  }

}
