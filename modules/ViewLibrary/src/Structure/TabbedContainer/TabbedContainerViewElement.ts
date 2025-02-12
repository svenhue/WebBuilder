import { BusinessObject, IViewElement, UIActionFactory GlobalStateProvider } from 'alphautils';
import { ViewElement } from 'alphautils';
import { ITabbedContainerConfiguration } from './ITabbedContainerConfiguration.js';
import { TabbedContainerViewModel } from './TabbedContainerViewModel.js';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';

export class TabbedContainerViewElement extends ViewElement{

    configuration: ITabbedContainerConfiguration;
    private viewModel: TabbedContainerViewModel;
    constructor(view: IViewElement, viewModel: TabbedContainerViewModel){
        super(view)
        this.configuration = view.configuration as ITabbedContainerConfiguration;
        this.viewModel = viewModel;

        if(this.dataAdapter == undefined){
            const config = {
                contextId:  (this as unknown as {GetConfiguration: () => IViewConfiguration}).GetConfiguration().contextid,
                boType: new BusinessObject({
                    name : "ViewConfiguration"
                })
            }
            this.dataAdapter = new DataAdapter(config)
        }
        this.actionFactory = (this as unknown as {GetService (string: string) : UIActionFactory}).GetService('UIActionFactory');

        this.globalStateProvider = this.GetService<GlobalStateProvider>('GlobalStateProvider') as GlobalStateProvider;
        this.globalStateProvider.AddViewContext({
            viewId: this.GetConfiguration().publicidentifier,
            localActions: [{
                methodName: "ChangeVisibility",
                function: (newtab: string) => this.ChangeTab(newtab)
            }]
        })
    }

    public ChangeTab(newtab: string){
        this.viewModel.activeTab.value = newtab;
    }
}