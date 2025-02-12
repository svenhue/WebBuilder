//@ts-nocheck
import { IHTTPClientService } from '../..//HTTP/IHTTPClientService';
import { UIAction } from '../../UIAction';
import { ISendRequestActionOptions } from './ISendRequestActionConfig';
import { ISendRequestAction } from './ISendRequestAction';
import { Transaction } from '../..//Transaction/Transaction';
import { UIActionEvent } from '../../UIActionEvent';
import { Container, injectable } from 'inversify';
import { inject } from 'vue'

@injectable()
export class SendRequestAction implements ISendRequestAction{

    declare options : ISendRequestActionOptions;
    private service: IHTTPClientService;

    override execute(ta?: Transaction): void {
        
        this.options.request.data = ta.nvc.toObject();
        this.service.sendRequest(this.options.request);
    }
}