import { IViewConfiguration } from "alphautils";
import { RunTimeVueApplicationViewModel } from "../../ViewModels/RuntimeVueApplicationViewModel";
import { PositioningMarker } from "./PositioningMarker";
import { useViewPositioning } from "./ViewPositioningHelper";

export class ViewPositioningHelper{

    private hoveredElement: HTMLElement | null = null;
    private viewModel: RunTimeVueApplicationViewModel
    private dontAllowDrop: boolean = false;
    private newPositionRelativetoHoveredElement: string = undefined;
    private currentSelectedParentElement: HTMLElement | null = null;
    private currentSelectedPositionInParent: Number = 0;
    private marker = new PositioningMarker();


    constructor(
        viewModel: RunTimeVueApplicationViewModel
    ){
        this.viewModel = viewModel;
    }

    public StartRelocatOnMouseDown(event: MouseEvent, element: IViewConfiguration){

        const OnMouseChanged = (e) => this.OnMouseChanged(e);
   

        document.addEventListener('mousemove', OnMouseChanged);
        document.addEventListener('mouseup', () => { this.OnMouseUp([element], false), document.removeEventListener('mousemove', OnMouseChanged) }, { once: true });
    }

    public OnMouseChanged(event: MouseEvent){

        //hover potential target element in dom
        this.ShowAndSetHoveredElement(event);
        this.ShowNewPositionRelativeToHoveredElement(event, this.hoveredElement);

        
    }
    public OnMouseUp(elementsToPosition: Array<IViewConfiguration>, elementIsNew: boolean = true){
        const elementToPosition = this.GetHostView(elementsToPosition);
        
        if(this.dontAllowDrop == false){
        

            if(this.currentSelectedParentElement == undefined){
                throw new Error('Parent not found');
            }
            if(elementIsNew){
                this.viewModel.AddRawViewElement(elementToPosition, false);

            }else{
                this.viewModel.RemoveNodeFromParentChildren(elementToPosition, true);
            }
            const parent = this.viewModel.GetViews().find(v => v.id == parseInt(this.currentSelectedParentElement.dataset.element.replace('element_', '')));

            if(parent == undefined){
                throw new Error('Parent not found');
            }
            this.viewModel.PartialUpdateView(elementToPosition.id, {keyValuePairs: [{key: 'parentId', value: parent.id}, {key: 'position', value: this.currentSelectedPositionInParent}]}, [{key: 'parentId', value: elementToPosition.parentId}, {key:'position', value: elementToPosition.position}], false, true);

          
            if(elementToPosition.parentId == undefined){
                throw new Error('Parent not found');
            }

            if(parent.children == undefined || parent.children?.length == 0 ||  !parent.children?.find(c => c.key == 'childrenCollection')?.value.includes(elementToPosition.id)){
                this.viewModel.AddNodeToParentChildren(elementToPosition, false)
            }

            for(const element of elementsToPosition.filter(e => e.id != elementToPosition.id)){
                this.viewModel.AddRawViewElement(element, false);

            }
                //rerender the root required to render elements in the correct order by the position property
                //const rootView = this.viewModel.GetViews().find(v => v.isRoot == true);
                //this.viewModel.PartialUpdateView(rootView.id, {keyValuePairs: [{key: 'key', value: Math.random()}]});
            this.viewModel.repository.CommitHistory();
          
        }
        this.marker.removeMarks();
    }

    private ShowAndSetHoveredElement(event: MouseEvent){
        const el = this.FindNextViewElement(event);
       
        if(el != undefined){
            this.viewModel.hoverViewSafe(parseInt(el.dataset.element.replace('element_', '')));
            const {isAllowed, ErrorMessage }  = this.CheckIfThisParentIsAllowed(el);


            if(isAllowed){
                this.dontAllowDrop = false;
                this.hoveredElement = el as HTMLElement;
            }else{
                this.dontAllowDrop = true;
                this.ShowPositionIsForbidden(el, ErrorMessage);
            }
        }
        return el;

    }
    private CheckIfThisParentIsAllowed(parent: HTMLElement){
        return {isAllowed: true, ErrorMessage: ''};
    }
    private ShowPositionIsForbidden(el: HTMLElement, ErrorMessage: string){
        //show forbidden message
    }
    private ShowNewPositionRelativeToHoveredElement(event: MouseEvent, target: HTMLElement){
        let posX = undefined
        if(!this.HasParentElement(target)){
            posX = undefined;
            this.currentSelectedParentElement = target;
            return;
        }

        const targetBox = target.getBoundingClientRect();

        function cursorIsOnTopSideOfElement(){
            return event.clientY < targetBox.top + 10 && event.clientY > targetBox.top;
        }
        function cursorIsOnBottomSideOfElement(){
            return event.clientY > targetBox.bottom - 10 && event.clientY < targetBox.bottom;
        }
        function cursorIsOnLeftSideOfElement(){
            return event.clientX < targetBox.left + 10 && event.clientX > targetBox.left;
        }
        function cursorIsOnRightSideOfElement(){
            return event.clientX > targetBox.right - 10 && event.clientX < targetBox.right;
        }

        if(cursorIsOnTopSideOfElement() == true){
            posX = 'top';
        }else if(cursorIsOnBottomSideOfElement() == true){
            posX = 'bottom';
        }else if(cursorIsOnLeftSideOfElement() == true){
            posX = 'left';
        }else if(cursorIsOnRightSideOfElement() == true){
            posX = 'right';
        }else{
            posX = undefined;
        }
     
        
        if(posX != undefined){
            this.marker.markElement(target, posX);
            
            const parent  = target.parentElement.closest('[data-element]') as HTMLElement;
            const position = this.getPositionOfNewElement(target, posX);
            if(parent == undefined){
                throw new Error('Parent not found');
            }
            this.currentSelectedParentElement = parent;
            this.currentSelectedPositionInParent = position;

        }else{
            this.currentSelectedParentElement = target
            this.marker.removeMarks();
        }
    }
    private getPositionOfNewElement(target: HTMLElement, positionRelativeToTarget: string){
        const targetViewConfig = this.viewModel.GetViews().find(v => v.id == parseInt(target.dataset.element.replace('element_', '')));

        if(targetViewConfig == undefined){
            throw new Error('Target not found');
        }
        let position = 0;
        switch(positionRelativeToTarget){
            case 'top':
                position = this.GetPos(targetViewConfig, true)
                break;
            case 'bottom':
                position =  this.GetPos(targetViewConfig, false)
                break;
            case 'left':
                position =  this.GetPos(targetViewConfig, true)
                break;
            case 'right':
                position = this.GetPos(targetViewConfig, false)
                break;
        }
        return position;
    }
    private GetPos(target: IViewConfiguration, nextLower = false){
        const siblings = this.viewModel.GetChildren(target.parentId);
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
    private HasParentElement(element: HTMLElement){
        return element.parentElement.closest('[data-element]') != undefined;
    }
    private FindNextViewElement(e: MouseEvent){
        
        let potentialElement = null;
        if(e.target.dataset.element != undefined){
                
            return e.target
        }
        else if(e.target.parentElement?.dataset.element != undefined){
            return e.target.parentElement
        }else{

            potentialElement = e.target?.closest('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }
            potentialElement = e.target?.querySelector('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }

            
        }
        return undefined;
    }
    public static FindNextViewElement(e: MouseEvent){
        
        let potentialElement = null;
        if(e.target.dataset.element != undefined){
                
            return e.target
        }
        else if(e.target.parentElement?.dataset.element != undefined){
            return e.target.parentElement
        }else{

            potentialElement = e.target?.closest('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }
            potentialElement = e.target?.querySelector('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }

            
        }
        return undefined;
    }

   
    private GetHostView(views: Array<IViewConfiguration>){
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

}