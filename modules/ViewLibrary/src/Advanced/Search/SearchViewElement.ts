import { BaseView } from 'alphautils'
import { ISearchViewModel } from './ISearchViewModel.js';

export class SearchViewElement extends BaseView{

    private viewModel: ISearchViewModel

    constructor(config: any){
        super(config);
       
    }

}