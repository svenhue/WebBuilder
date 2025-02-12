//@ts-nocheck
import { SendRequestAction } from './Actions/SendRequest/SendRequestAction.js';
import { ControlComponentAction } from './Actions/ControlComponent/ControlComponentAction.js';

import { inject, injectable } from 'inversify';
import { IHTTPClientService } from '../HTTP/IHTTPClientService.js';
import { GlobalStateProvider } from '../Data/StateManagement/GlobalStateProvider.js';
import { UIActionTypes } from './UIActionTypes.js';
import { RestrictedServiceProvider } from '../Services/Provider/RestrictedServiceProvider.js';
import { IUIEvent } from './EventHandler/IUIEvent.js';
import { IUIAction } from './IUIAction.js';
import { UIAction } from './UIAction.js';


@injectable()
export class UIActionFactory {

  @inject('SendRequestAction') private sendRequestAction: SendRequestAction;
  @inject("ControlComponentAction") private controlComponentAction:  ControlComponentAction;
  @inject("CallServiceAction") private callServiceAction:  CallServiceAction;

  private httpService: IHTTPClientService;
  private globalStateProvider: GlobalStateProvider;
  constructor(
    @inject('HTTPClientService') httpService: IHTTPClientService,
    @inject('GlobalStateProvider') private globalStateProvider: GlobalStateProvider,
  ){
    this.httpService = httpService;
    this.globalStateProvider = globalStateProvider;
  }
  


  public create(config: IUIAction): UIAction{
    switch (config.type) {
      case UIActionTypes['Control component']:
        return  this.controlComponentAction
        case UIActionTypes['Call service']:
          return this.callServiceAction
    }
  }
}
