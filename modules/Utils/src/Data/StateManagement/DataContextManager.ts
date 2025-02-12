//@ts-ignore
import { injectable } from 'inversify';
import { IDataContext } from './IDataContext.js';
import { ContextLevel } from './ContextLevel.js';
@injectable()
export class DataContextManager{

    private rootContext: IDataContext
    private Ids: Array<number> = [];
    private parentManager?: DataContextManager;
    public hasParentManager: boolean = false;
    constructor(){
       
    }
    public UpgradeContextLevel(contextid: number, level?: ContextLevel, parentManager? : DataContextManager){
        const parentsContextEntry = parentManager.findContextById(contextid);

        if(parentsContextEntry == undefined){
            throw new Error('No context found with id: ' + contextid)
        }
        parentsContextEntry.contextLevel = level;
        this.rootContext = parentsContextEntry;
        this.parentManager = parentManager;
        return parentsContextEntry;
    }
    public NewContext(parentContextId?: number, level?: ContextLevel): IDataContext{
        const id = this.hasParentManager == true ? this.parentManager.AddChildManagerContext() +1 : this.Ids.length == 0 ? 0 : this.Ids[this.Ids.length - 1] + 1;
        const parentContext = this.findContextById(parentContextId);
        
        
        
        const context = {
            contextid: id,
            parentId: parentContext != undefined ? parentContext.contextid :0,
            children: [],
            contextLevel: level == undefined ? ContextLevel.State : level
        } as IDataContext

        this.Ids.push(id);

        if(parentContext != undefined){
            parentContext.children.push(context)
        }else if(this.rootContext == undefined){
            this.rootContext = context;
        }else{
            this.rootContext.children.push(context);
        }
        return context;
    }
    public GetParentContext(context: IDataContext): IDataContext{
        return this.findContextById(context.parentId);
    }
    //todo remove this non sense logic?
    public getApplicationContext(contextid: number): IDataContext{
        const context = this.findContextById(contextid);
        if(context.contextLevel != undefined && context.contextLevel == ContextLevel.Application){
            console.log("XXX", context)
            return context;
        }
        if(context.parentId == undefined && context.contextLevel == ContextLevel.Application){
            return context;
        }else if(context.parentId == undefined && context.contextLevel != ContextLevel.Application){
            return undefined
        }
        return this.getApplicationContext(context.parentId);
    }
    public GetRootContext(): IDataContext{
        return this.rootContext;
    }
    private findContextById(contextId: number): IDataContext | null {
        
        if(contextId == undefined){
            return undefined
        }
        if(this.rootContext== undefined){
            return undefined
        }
        return this.traverseTree(this.rootContext, contextId);
    }

    private traverseTree(node: IDataContext, contextId: number): IDataContext | null {
        if (node.contextid === contextId) {
            return node;
        }

        for (const child of node.children){
            const result = this.traverseTree(child as IDataContext, contextId);
            if (result) {
                return result;
            }
        }
        return null;
    }
    findClosestContextById(contextId: number): IDataContext | null {
        
        let closestContext: IDataContext | null = null;
        let closestDistance: number = Infinity;
        this.traverseTreeC(this.rootContext, contextId, (node) => {
            if(node.contextLevel == undefined){
                return;
            }
            if (node.contextLevel === 0) {

                const distance = Math.abs(node.contextid - contextId);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestContext = node;
                }
            }
        });

        return closestContext;
    }

    private traverseTreeC(node: IDataContext, contextId: number, callback: (node: IDataContext) => void): void {
        callback(node);

        node.children.sort((a, b) => (a as IDataContext).contextid - (b as IDataContext).contextid);

        for (const child of node.children) {
            this.traverseTreeC(child as IDataContext, contextId, callback);
        }
    }
    public AddChildManagerContext(): number{
        const id = Math.max(...this.Ids) + 1;
        this.Ids.push(id);
        return id;
    }
}