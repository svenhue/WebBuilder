export class PositioningMarker {
    
    private markedElement: HTMLElement | null = null;
    
    private relativeMarkings =  {
        left : 'left',
        right : 'right',
        top : 'top',
        bottom : 'bottom'
    }

    constructor() {
    
    }

    public markElement(element: HTMLElement, relativeMarkingPosition: string): void {
        if(this.markedElement != undefined){
            this.removeMarks();
        }
        this.markedElement = element;

        const markElement = this.createMarkElement(relativeMarkingPosition, element);

        if(relativeMarkingPosition == this.relativeMarkings.left || relativeMarkingPosition == this.relativeMarkings.top){
            element.before(markElement);
        }else{
            element.after(markElement);
        }
    }

    public removeMarks(){
        const el = document.getElementById('positioningMarker');
        if(el != undefined){
            el.remove();
        }
    }

    private createMarkElement(position: string, parent: HTMLElement): HTMLElement{
        
        const targetBox = parent.getBoundingClientRect();
        
        
        const markElement = document.createElement('div');
        markElement.style.position = 'absolute';
        markElement.style.backgroundColor = 'red';
        markElement.id = 'positioningMarker';
        
        const x = 90;
        const y = 112;
        switch(position){
            case this.relativeMarkings.left:
                markElement.style.marginLeft = '-5px'
                markElement.style.width = '5px';
                markElement.style.height = targetBox.height + 'px';
                markElement.style.left = targetBox.left - x + 'px';
                markElement.style.top = targetBox.top - y + 'px';
                break;
            case this.relativeMarkings.right:
                markElement.style.marginRight = '-5px'
                markElement.style.height =targetBox.height + 'px';
                markElement.style.width = '5px'

                markElement.style.left = targetBox.right - x + 'px';
                markElement.style.top = targetBox.top - y + 'px';
            
                break;
            case this.relativeMarkings.top:
                markElement.style.marginTop = '-5px'

                markElement.style.width = targetBox.width + 'px';
                markElement.style.height = '5px'

                markElement.style.top = targetBox.top - y + 'px';
                markElement.style.left = targetBox.left - x+ 'px';
                break;
            case this.relativeMarkings.bottom:
                markElement.style.marginBottom = '-5px'
                markElement.style.width = targetBox.width + 'px';
                markElement.style.height = '5px'

                markElement.style.top = targetBox.bottom - y + 'px';
                markElement.style.left = targetBox.left - x + 'px';
                break;
        }

        return markElement;
    }



  
}

