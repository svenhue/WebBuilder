import { c } from "vite/dist/node/types.d-FdqQ54oU";

export function EditorManager(){

    //todo: fix too many elements when adding new format
    function formatNewFragment(selection: Selection, newFormatNode: Node){
        const range = selection.getRangeAt(0);    
        const fragment = range.cloneContents();
        
        let isFinished = false;
        
        fragment.childNodes.forEach((n) => {
            isFinished = formatNode(n)

            //console.log("all finished?", isFinished)
        })
        
        function formatNode(node: Node): boolean{

            let isFormatted = false;

            if(node?.childNodes.length > 0){
                node?.childNodes?.forEach((child) => {
                    isFormatted = formatNode(child)

                    //console.log("2. okay im formatted, breaking!")
                    if(isFormatted){
                        return;
                    }
                })
            }
            
            // do nothing if the node is already formatted
            if(isAlreadyFormatted(node, newFormatNode)){
                return;
            }
            
            if(node.nodeType == Node.ELEMENT_NODE){

                const newChild = newFormatNode.cloneNode(true)
                newChild.textContent = node.textContent
                node.textContent = null;
                node.appendChild(newChild)
                return true;   
            }else if(node.nodeType == Node.TEXT_NODE){
                const newChild = newFormatNode.cloneNode(true)
                newChild.textContent = node.textContent
                
                node.parentNode.replaceChild(newChild, node)
                

                
            }else{
            }

            return isFormatted;

        }
        range.deleteContents()
        range.insertNode(fragment)
        

    }
    
    function isAlreadyFormatted(node: Node, targetFormat: Node){
        let parentNode: Node | DocumentFragment = node;
        let isFormatted = false;
        let i = 0;

        while(i < 10){
            i++;
            if(parentNode?.nodeName == targetFormat?.nodeName){
                isFormatted = true;

                break;
            }
           
            parentNode = parentNode?.parentNode ?? parentNode?.parentElement;
        }
        return isFormatted;
    }

    function removeFormattingFromSelection(selection: Selection){

        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const text = range.toString();

        const textNode = document.createTextNode(text);
      
        range.deleteContents();
       
        range.insertNode(textNode);
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(textNode);
        newRange.collapse(false);
       selection.addRange(newRange);

    }



    return {
        format: formatNewFragment,
        removeFormat: removeFormattingFromSelection
    }
}