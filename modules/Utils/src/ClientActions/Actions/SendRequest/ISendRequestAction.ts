import { IHTTPClientService } from '../../../HTTP/IHTTPClientService.js';
import { IUIAction } from '../../IUIAction.js';

export interface ISendRequestAction extends IUIAction{
    service: IHTTPClientService;
}