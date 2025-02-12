import { IDataAdapter } from "alphautils";
import { ViewPositioningHelper } from "../../Helpers/ViewPositioningHelp";
import {  ref, Ref } from "vue";
import { inject, interfaces, injectable } from 'inversify';
import { RunTimeVueApplicationViewModel } from "src/ViewModels/RuntimeVueApplicationViewModel";
import { EditorManager } from "./EditorManager";

@injectable()
export class EditModeFeature{

    private dataAdapterConstructor: interfaces.Newable<IDataAdapter>

    private dataAdapter: IDataAdapter;

    public isEnabled: Ref<boolean> = ref(false);

    constructor(
        @inject("DataAdapterConstructor") dataAdapterConstructor: interfaces.Newable<IDataAdapter>
    ){
        this.dataAdapterConstructor = dataAdapterConstructor;
    }

    public enable(viewModel: RunTimeVueApplicationViewModel){
        this.isEnabled.value = true;
        const root = document.getElementById("development-container");

        root.addEventListener("click", Listener);

        let targetTextNode: HTMLElement | null = null;

        let lastEditedElement: HTMLElement | null = null;

        

        return  Listener(undefined, true)
        

        function Listener(event: MouseEvent, onlygetClearFunction?: boolean){
            if(onlygetClearFunction){
                return disable
            }
            if(event?.target?.classList.contains("editor-button") || event?.target?.id == "1234phß0nb283cr45zt234" ){
                return disable
            }

            const target = ViewPositioningHelper.FindNextViewElement(event) as HTMLElement
            let selection: Selection | null = null;
            let editorElement: HTMLDivElement | null = null;            
            
            targetTextNode = findTextNode(target);
            //todo
            console.log(targetTextNode, target)
            if(lastEditedElement != null && lastEditedElement != targetTextNode){
                lastEditedElement.contentEditable = "false";
            }

            if(targetTextNode == null){
                return disable
            }

            targetTextNode.contentEditable = "true"; 
            
            getAllChildNodes(targetTextNode).forEach(node => {
                node.contentEditable = "true";   
            })

            targetTextNode.focus();
            targetTextNode.classList.add("IAMEDITED")
            lastEditedElement = targetTextNode;

            root.addEventListener('mouseup', ShowEditorBar)

            document.addEventListener('click', HandleDisableElementEditing)
            
            
            return {
                clear: disable
            }
            function HandleDisableElementEditing(event: MouseEvent){
                
                const allChilds = getAllChildNodes(targetTextNode);
                if(event.target != targetTextNode && event.target.classList.contains("editor-button") == false && allChilds.includes(event.target as HTMLElement) == false){    
                    targetTextNode.removeAttribute("contenteditable");

                    targetTextNode.removeEventListener('mouseup', ShowEditorBar)
                    getAllChildNodes(targetTextNode).forEach(node => {
                        if(node.nodeType == Node.TEXT_NODE){
                            return
                        }

                        node?.removeAttribute("contenteditable");
                        node?.removeEventListener('mouseup', ShowEditorBar)
                    })
                    const el = document.querySelectorAll("[id^='1234phß0nb283cr45zt234']")

                    el?.forEach(e => {return e.remove()})
                    document.removeEventListener('click', HandleDisableElementEditing)

                    root.removeEventListener('mouseup', ShowEditorBar)
                }
            }
            
            
            function ShowEditorBar(event: MouseEvent){
                if(event.target?.getAttribute('contenteditable') != "true"){
                    return
                }
                const el = document.querySelectorAll("[id^='1234phß0nb283cr45zt234']")
                el?.forEach(e => e.remove())

                editorElement = editorView(targetTextNode).mount(event);
                selection = document.getSelection()
            }
          


            function editorView(target?: HTMLElement){

                const mount = (event: MouseEvent) => {
                    
                    const exists = document.getElementById("1234phß0nb283cr45zt234")
            
                    if(exists != null){
                        return disable
                    }
            
                    const root = document.createElement('div');
                    root.id = "1234phß0nb283cr45zt234"
                    root.style.zIndex = "999999"
                    root.style.position = "absolute";
            
                    root.style.top = event.y - 50 + "px";
                    root.style.left = event.x - 50 + "px";
                    
                    root.style.height = "40px";
                    root.style.backgroundColor = "white";
                    //root.style.opacity = "0.8";
                    //root.style.width = "200px"
                    const container = document.createElement('div');
                    
            
                    const boldButton = document.createElement('button');
                    boldButton.style.width = "40px";
                    root.style.zIndex = "999999"
                    boldButton.style.height = "40px";
                    boldButton.style.backgroundColor = "black";
                    boldButton.classList.add("editor-button")
                    boldButton.style.color= "white"
                    boldButton.innerHTML = "B";
                    boldButton.addEventListener('click', () => {
                        EditorManager().format(selection, document.createElement('strong'))
                        updateNode();
                    })
                    container.appendChild(boldButton);
                    
                    const italicButton = document.createElement('button');
                    italicButton.style.width = "40px";
                    italicButton.style.height = "40px";
                    italicButton.style.backgroundColor = "black";
                    italicButton.classList.add("editor-button")
                    italicButton.style.color= "white"
                    italicButton.innerHTML = "I";
                    italicButton.addEventListener('click', () => {
                        EditorManager().format(selection, document.createElement('em'))
                        updateNode();
                    })
                    container.appendChild(italicButton);


                    const clearButton = document.createElement('button');
                    clearButton.style.width = "40px";
                    clearButton.style.height = "40px";
                    clearButton.style.backgroundColor = "black";
                    clearButton.classList.add("editor-button")
                    clearButton.style.color= "white"
                    clearButton.innerHTML = "C";
                    clearButton.addEventListener('click', () => {
                        EditorManager().removeFormat(selection)
                        updateNode();
                    })

                    container.appendChild(clearButton);

                    root.appendChild(container);
            
                    document.body.appendChild(root);
                    
                    return root;

                    function updateNode(){
                        const nodeId = parseInt(target.dataset['element'].replace('element_', '') as string);
                        viewModel.PartialUpdateView(parseInt(target.dataset['element'].replace('element_', '') as string), {keyValuePairs:[{key: getPropKey(nodeId), value: targetTextNode.innerHTML}]});
                    }
                }
            
                const unmount = () => {
                    const el = document.getElementById("1234phß0nb283cr45zt234")
                    el?.remove()
                }
            
                return {
                    mount,
                    unmount
                }
            }
            function findTextNode(root: HTMLElement): HTMLElement{
                let potentialElement = null;
                if(root.dataset['textnode'] != undefined){
                        
                    return root
                }
                else if(root.parentElement?.dataset['textnode'] != undefined){
                    return root.parentElement
                }else{

                    potentialElement = root?.closest('[textnode]');
                    if(potentialElement != undefined){
                        return potentialElement;
                    }
                    potentialElement = root?.querySelector('[textnode]');
                    if(potentialElement != undefined){
                        return potentialElement;
                    }     
                }
                return undefined;
            }

            function getPropKey(nodeId: number){
                const node = viewModel.GetViews().find(n => n.id == nodeId);
                let key = "content.text"
                if(node == undefined){
                    return;
                }
                if(typeof node.content == "string"){
                    key = "content";
                }
                else if(node.content?.label != undefined){
                    key = "content.label";
                }else if (node.content?.text != undefined){
                    key = "content.text";
                }
                return key;
            }       

            function disable(self: EditModeFeature){
                root.removeEventListener("click", Listener);
                editorView().unmount()
                
                targetTextNode?.removeEventListener('mouseup', ShowEditorBar)
                document?.removeEventListener('click', HandleDisableElementEditing)
                self.isEnabled.value = false;
            }
        }
    }

    


}

function getAllChildNodes(node) {
    let nodes = [];

    function traverse(currentNode) {
        nodes.push(currentNode); // Add the current node to the list
        currentNode.childNodes.forEach(child => traverse(child)); // Recurse on each child node
    }

    traverse(node);
    return nodes;
}
