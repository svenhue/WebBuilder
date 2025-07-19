import {ViewConfiguration} from './ViewConfiguration.js';
import {Ref, MaybeRefOrGetter, toValue} from 'vue';
import { BaseServiceProvider } from '../Services/Provider/BaseServiceProvider.js';


export class BaseView extends BaseServiceProvider
  {

  public config: MaybeRefOrGetter<ViewConfiguration>;
  public templateRef:  Ref<HTMLElement>

  public untracked: boolean = false
  constructor(config: MaybeRefOrGetter<ViewConfiguration>) {
    super(toValue(config)?.contextid);
    this.config = config;
    
    const rawConfig = this.GetConfiguration();

    if(!rawConfig?.id || !rawConfig.contextid ){
      this.untracked = true
    }

  }

  public GetConfiguration(): ViewConfiguration{
    return toValue(this.config);
  }

  public getTemplateRef(): Ref<HTMLElement>{
    return this.templateRef;
  }


}
