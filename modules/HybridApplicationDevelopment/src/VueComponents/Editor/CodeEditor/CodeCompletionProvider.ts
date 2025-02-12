//@ts-ignore
import { IViewConfiguration, VueApplication, nthIndex } from 'alphautils';
import { injectable, inject } from 'inversify';
import { IExecutionContextProvider } from 'alphautils/src/CodeExecution/IExecutionContextProvider';
import * as monaco from 'monaco-editor';
if(typeof window !== 'undefined'){
    
}
@injectable()
export class CodeCompletionProvider{

    private contextid: number;
    private contextProvider: IExecutionContextProvider;
    private state = {
        components: [],
        variables: [],
        colors: [],
        app: VueApplication
    }
    constructor(
        @inject('CodeContextProvider') contextProvider: IExecutionContextProvider,
    ){
        this.contextProvider = contextProvider;
       
    }
    public GetViewContextCompletions(model: monaco.editor.ITextModel, position: monaco.IPosition, contextid: number, requestingComponent?: IViewConfiguration){
        this.contextid = contextid;
        this.state = this.contextProvider.GetContext(this.contextid);
        

        
        const viewcontextproposals = (x) => this.createViewContextProposals(x);
        const componentProppsals = (x) =>this.createAvaibleComponentsProposals(x);
        const componentPropsProposals = (x, y) => this.createComponentPropsProposals(x, y);
        const objectPropsProposals = (x, y) => this.createObjectPropsProposals(x, y);
        const variableProposals = (x) => this.createVariableProposals(x);
        const colorProposals = (x) => this.createColorProposals(x);

        const textUntilPosition = model.getValueInRange({
			startLineNumber: 1,
			startColumn: 1,
			endLineNumber: position.lineNumber,
			endColumn: position.column,
		});
		
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };
                
                const wantComponents = model.getWordAtPosition(new monaco.Position(position.lineNumber, position.column-1))
                //components.
                if(wantComponents.word == 'components'){
                    return {
                        suggestions: componentProppsals(range)
                    }
                }else if( textUntilPosition.match(/components.*./)){

                    const countDots = textUntilPosition.match(/\./g).length
                    if(countDots == 3){
                        const field = textUntilPosition.substring(nthIndex(textUntilPosition, '.', 2)+1, textUntilPosition.lastIndexOf('.'))
                        const componentPublicIdentifier = textUntilPosition.substring(nthIndex(textUntilPosition, '.', 1) + 1, nthIndex(textUntilPosition, '.', 2))
                        const component = this.state.components[componentPublicIdentifier]
                        return {
                            suggestions: objectPropsProposals(component[field], range)
                        }
                    }

                    return {
                        suggestions: componentPropsProposals(textUntilPosition, range)
                    }
                }else if(wantComponents.word == 'component'){
                    return { 
                        
                        suggestions: objectPropsProposals(requestingComponent, range)
                    }
                }else if(wantComponents.word == 'app'){
                    return { 
                        
                        suggestions: objectPropsProposals(this.state.app, range)
                    }
                }
                
                else if(wantComponents.word == 'variables'){
                    return {
                        suggestions: variableProposals(range)
                    }
                    
                }
                else if(wantComponents.word == 'colors'){
                    return {
                        suggestions: colorProposals(range)
                    }
                }else if(wantComponents.word == word.word){
                    return {
                        suggestions: viewcontextproposals(range)
                    }
                }else{
                    return {
                        suggestions: []
                    }
                }

   
    }
    private createVariableProposals(range): Array<monaco.languages.CompletionItem>{
   
        return Object.entries(this.state.variables).map(v => {
            return {
                label: v[0],
                kind: monaco.languages.CompletionItemKind.Variable,
                insertText: v[0],
                range: range
            }
        })
    }
    private createColorProposals(range): Array<monaco.languages.CompletionItem>{
        return Object.entries(this.state.colors).map(c => {
            return {
                label: c[0],
                kind: monaco.languages.CompletionItemKind.Color,
                insertText: c[0],
                range: range
            }
        })
    }
    private createViewContextProposals(range): Array<monaco.languages.CompletionItem>{
        return [
            {
                label: 'app',
                kind: monaco.languages.CompletionItemKind.Module,
                documentation: 'The current application',
                insertText: 'app',
                range: range,
                preselect: true,
            },
            {
                label: 'component',
                kind: monaco.languages.CompletionItemKind.Module,
                documentation: 'The component that is requesting the completion',
                insertText: 'component',
                range: range,
                preselect: true,
            },
            {
                label: 'components',
                kind: monaco.languages.CompletionItemKind.Module,
                documentation: 'The components in the view context',
                insertText: 'components',
                range: range,
                preselect: true,
                
            },
            {
                label: 'variables',
                kind: monaco.languages.CompletionItemKind.Module,
                documentation: 'The variables in the view context',
                insertText: 'variables',
                range: range,
                preselect: true,
            },
            {
                label: 'colors',
                kind: monaco.languages.CompletionItemKind.Module,
                documentation: 'The colors in the view context',
                insertText: 'colors',
                range: range,
                preselect: true,
            }
        ]
    }
    private createAvaibleComponentsProposals(range): Array<monaco.languages.CompletionItem>{
        
        return Object.entries(this.state.components).map(c => {
            return {
                label: c[0],
                kind: monaco.languages.CompletionItemKind.Struct,
                insertText: c[0],
                range: range
            }
        })
    }
    private createObjectPropsProposals(obj: object, range): Array<monaco.languages.CompletionItem>{
        return Object.keys(obj).map(k => {
            return {
                label: k,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: k,
                range: range
            }
        })
    }
    private createComponentPropsProposals(textUntilPosition: string, range): Array<monaco.languages.CompletionItem>{
        const countDots = textUntilPosition.match(/\./g).length
        const boPublicIdentifierStartI = nthIndex(textUntilPosition, '.', countDots - 1)
        const publicidentifierEndI = textUntilPosition.lastIndexOf('.')
        const publicidentifier = textUntilPosition.substring(boPublicIdentifierStartI + 1, publicidentifierEndI)
        
        const bo = this.state.components[publicidentifier]
       
        if(bo == undefined){
            return []
        }
        const entries =  Object.entries(bo)
        return entries.map(c => {
            return {
                label: c[0],
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: c[0],
                range: range
            }
        })
    }
}