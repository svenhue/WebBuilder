import { IViewConfiguration } from "alphautils";
import { RunTimeVueApplicationViewModel } from "src/ViewModels/RuntimeVueApplicationViewModel";
import { Ref, ref } from "vue";

interface IPositionToDrop{
    target: HTMLElement;
    before: boolean;
}

interface CloneElement{
    attributes: ElementAttributes,
    children: CloneElement[]
    parents?: ElementAttributes[]
  }
  
  interface ElementAttributes {
      tagName: string;
      id: string;
      classList: string[];
      attributes: { [key: string]: string };
  }
  
  interface MouseEventDetails {
      clientX: number;
      clientY: number;
      target: CloneElement;
  }

  
export const useViewPositioning = (
    viewModel: RunTimeVueApplicationViewModel,
    rootElementId: string
    ) => {

    const currentTarget = ref<MouseEventDetails | null>(null);

    function setNextViewElement(element: MouseEventDetails){
        currentTarget.value = element;
        console.log(123, element)
    }
    function onMouseChangedTrigger(details: MouseEventDetails){

    }
    const targetParent = ref<HTMLElement | null>(null);
    let changeDIrectionUp = true;
    let originElement = ref<HTMLElement | null>(null);
    const preventMouseChangedTarget = ref(false)

    const position = ref<IPositionToDrop | null>(null);
    

    function startAddNewComponent(type: string, values?: IViewConfiguration){

        viewModel.disableHover.value = true
        viewModel.unfocusAll()
        const rootElement = document.getElementById(rootElementId);
        if(rootElement == undefined){
            throw new Error('Root element not found');
        }
        
        const throttleMouseChanged = onMouseChanged;
        rootElement.addEventListener('mousemove', throttleMouseChanged);
        document.addEventListener('keydown', changeTargetParentDepth);
        document.addEventListener('mouseup', (e) => {
            const newElement = viewModel.createElement(type, values);
            
            onMouseUp(e, newElement);
            document.removeEventListener('keydown', changeTargetParentDepth)
            rootElement.removeEventListener('mousemove', throttleMouseChanged)
            }, {once: true}
        );
    }

    function startRelocateExistingView(event: MouseEvent, view: IViewConfiguration){
        if(view.isRoot){
            return;
        }
        viewModel.disableHover.value = true
        viewModel.unfocusAll()

        const rootElement = document.getElementById(rootElementId);

        //viewModel.PartialUpdateView(view.id, {keyValuePairs:[  {key: 'isActive', value: false}]}, [{}])
        
        rootElement.addEventListener('mousemove', onMouseChanged );
        document.addEventListener('keydown', changeTargetParentDepth);

        document.addEventListener('mouseup', (e) => {
            onMouseUp(e, [view], false);
            rootElement.removeEventListener('mousemove', onMouseChanged)
            document.removeEventListener('keydown', changeTargetParentDepth)
            viewModel.disableHover.value = false;
        }, {once: true})
        viewModel.disableHover.value = false;

    }
    function changeTargetParentDepth(event: KeyboardEvent){

        preventMouseChangedTarget.value = true;
        if(event.code != 'ControlLeft'){
            return;
        }
        if(targetParent.value == undefined){
            return;
        }

        function Upper(){   
                let nextUpperElement = targetParent.value.closest('[data-element]');
                if(nextUpperElement == targetParent.value){
                    targetParent.value = targetParent.value.parentElement?.closest('[data-element]'); 
                }
                if(targetParent.value == null){
                    Lower()
                    return;
                }else{
                    const id = parseInt(targetParent.value.dataset.element.replace('element_', ''))
                    viewModel.focussedViews.value = [id];
                    viewModel.hoverViewSafe(id)
                }
        }
        function Lower(){
            changeDIrectionUp = true;
            targetParent.value = originElement.value;
            const id = parseInt(targetParent.value.dataset.element.replace('element_', ''))
            viewModel.focussedViews.value = [id];
            viewModel.hoverViewSafe(id)
            
        }
        
        Upper();
    }

    function onMouseChanged(event: MouseEvent){





        return;
        if(preventMouseChangedTarget.value == false){
            targetParent.value = currentTarget.value as HTMLElement;
            originElement.value = currentTarget.value as HTMLElement;
            viewModel.hoverViewSafe(parseInt(targetParent.value?.dataset?.element.replace('element_', '')))
        }
            const pN = getPotentialNeighbor(event, targetParent.value as HTMLElement);
            if(pN == null){
                position.value = {
                    before: true,
                    target: targetParent.value as HTMLElement
                }
            }
            position.value = decidePositionToDrop(pN, event);

            markPositionToDrop(position.value);
        
        
    }

    // requires the css class drop_before and drop_after
    function markPositionToDrop(position: IPositionToDrop){
        if(position.target == null){
            return;
        }
        const old = document.querySelectorAll('#drop_marker');
        if(old != null){
            old.forEach(o => o.remove());
        }

        const rect = position.target?.getBoundingClientRect();
        
        const newEl = document.createElement('div');
        newEl.style.position = 'absolute';
        newEl.style.width = rect?.width + 'px';
        newEl.style.height = rect?.height + 'px';
        newEl.style.top = rect?.top + 'px';
        newEl.style.left = rect?.left + 'px';
        newEl.style.zIndex = '15';
        newEl.id = 'drop_marker';


        
        if(position.before){
            newEl.classList.add('drop_before');
            newEl.classList.remove('drop_after');
        }else{
            newEl.classList.add('drop_after');
            newEl.classList.remove('drop_before');
        }
        document.body.appendChild(newEl);
    }


    function getPotentialNeighbor(event: MouseEvent, parent: HTMLElement){
        const children = parent?.querySelectorAll('[data-element]');
        let child = null;
        children?.forEach(c => {
            const box = c.getBoundingClientRect();
            //check if the event is in the element
            if(event.clientX > box.left && event.clientX < box.left + box.width && event.clientY > box.top && event.clientY < box.top + box.height){
                child = c;
            }
            
        })
        return child;
        
    }

    function onMouseUp(event: MouseEvent, newElements: IViewConfiguration[], isNew: boolean = true){
        //const targetPosition = decidePositionToDrop(position.value.target as HTMLElement, event);

        //markPositionToDrop()

        
        const newElement = GetHostView(newElements);
        

        //const pos = getExcatPositionToDrop(targetPosition, event);
        //const parentId = parseInt(currentTarget.value.parent.attributes['data-element'].replace('element_', ''));

        if(isNew){
            newElement.position = 1;
            viewModel.AddRawViewElement(newElement, false, true)
        }else{
            viewModel.PartialUpdateView(newElement.id, {keyValuePairs:[  {key: 'position', value: pos}]}, [{}])
            viewModel.RemoveNodeFromParentChildren(newElement, true, false);
            viewModel.settingsService.OnNewElement(newElement);
        }
        
        //viewModel.PartialUpdateView(newElement.id, {keyValuePairs:[  {key: 'parentId', value: parentId}]}, [{}])
        //viewModel.AddNodeToParentChildren(newElement, true, false);
        

        for(const element of newElements.filter(e => e.id != newElement.id)){
            viewModel.AddRawViewElement(element, false);

        }


        viewModel.disableHover.value = false

        const old = document.querySelectorAll('#drop_marker');
        if(old != null){
            old.forEach(o => o.remove());
        }
    }

    function decidePositionToDrop(currentTarget: HTMLElement, event: MouseEvent): IPositionToDrop{


        function isInTargetChildrenDropzone(target: HTMLElement, event: MouseEvent){
            if(target == null){
                return false;
            }
            const targetBox = target.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            if(x < targetBox.left + targetBox.width / 2){
                return true
            }

            return false;
        }

        const addToCurrentTargetChildren = isInTargetChildrenDropzone(currentTarget, event);

        return {
            target: currentTarget,
            before: addToCurrentTargetChildren
        }
    }

    function getExcatPositionToDrop(position: IPositionToDrop, event: MouseEvent){
        if(position.target == null){
            return 0;
        }
        const targetView = viewModel.GetViews().find(v => v.id == parseInt(position.target.dataset.element.replace('element_', '')));
        if(targetView == undefined){
            throw new Error('Target view not found');
        }
        function GetPos(target: IViewConfiguration, nextLower = false){
            const siblings = viewModel.GetChildren(target.parentId);
            let pos = 0;
            if(target.position == 0 || target.position == undefined)[
                pos = 1
            ]
    
            if(nextLower == true){
                siblings.forEach(sibling => {
                    if (sibling?.position < target?.position && (pos === 0 || sibling?.position > pos)) {
                        pos = sibling.position;
                    }
                });
                pos = (target.position + pos) / 2;
            }else{
                siblings.forEach(sibling => {
                    if (sibling?.position > target?.position && (pos === 0 || sibling?.position < pos)) {
                        pos = sibling.position;
                    }
                });
                if(pos == 0){
                    const maxPosOfSiblings = Math.max(...siblings.map(s => s.position));
                    pos = maxPosOfSiblings + 1;
                }
                pos = ( pos + target.position) / 2;
            }
            return pos;
        }

        return GetPos(targetView, position.before);
    }   

    function GetHostView(views: Array<IViewConfiguration>){
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        let tmp;
        for (let i=views.length-1; i>=0; i--) {
            tmp = views[i].id;
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
        }
        return views.find(v => v.id == lowest)
    }

    return {
        startAddNewComponent,
        startRelocateExistingView,
        setNextViewElement
    }

}
