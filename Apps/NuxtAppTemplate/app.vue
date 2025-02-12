<template>
  <div id="rootinit">
    <div data-element="element_2" element="2" :style="{backgroundColor: 'red'}">
    owieurngoweringuwegwerg
    wergwe
    gw
    ewe
    rgew
    g
    er
    wergwegwer
    g
    werg
    werg
    wegwergwegewrgewgerw
    </div>
    <NuxtPage />
  </div>
</template>


<script setup lang="ts">
import { IApplicationConfiguration, IDataAdapter, IPageConfiguration } from "alphautils";
import { DataAdapter } from 'alphautils';
import { DataAdapterOptions } from 'alphautils';
import { BusinessObject } from 'alphautils';

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

function getElementAttributes(element: HTMLElement): ElementAttributes {
    const attributes: { [key: string]: string } = {};
    for (let attr of element.attributes) {
        attributes[attr.name] = attr.value;
    }
    return {
        tagName: element.tagName,
        id: element.id,
        classList: Array.from(element.classList),
        attributes: attributes
    };
}

function getMouseEventDetails(e: MouseEvent | Element): MouseEventDetails {
  if(e == undefined){
    return undefined
  }
    const targetElement = e.target != undefined ? e.target : e as HTMLElement;
    const parents: ElementAttributes[] = [];

    let currentElement = targetElement;
    for (let i = 0; i < 5; i++) {
        if (currentElement.parentElement) {
            parents.push(getElementAttributes(currentElement.parentElement));
            currentElement = currentElement.parentElement;
        } else {
            break;
        }
    }

    const children = getChildren(targetElement, 5);
    
    let depth = 0;
    function getChildren(element: HTMLElement, depth: number): CloneElement[] {
      if (depth === 0) return [];

      const children: CloneElement[] = [];
      for (let child of element?.children) {
        const childElement = child as HTMLElement;
        children.push({
          attributes:getElementAttributes(childElement),
          children: getChildren(childElement, depth - 1)
        });
      }
      return children;
    }

    children.push(...getChildren(targetElement, 5));
    

    return {
        clientX: e.clientX,
        clientY: e.clientY,
        target: {
          children: children,
          parents: parents,
          attributes: getElementAttributes(targetElement)
        }
        
    };
}

const options = new DataAdapterOptions({
            boType: new BusinessObject({
                name: 'Page'
            }),
            subscribe: {
                scope: "allOfBOType"
            },

            contextId: 4, 
        })
        const options2 = new DataAdapterOptions({
            boType: new BusinessObject({
                name: 'ViewConfiguration'
            }),
            subscribe: {
                scope: "allOfBOType"
            },

            contextId: 4, 
        })
const dataAdapter = new DataAdapter(options, 4)
const dataAdapter2 = new DataAdapter(options2, 4)
const x = inject('viewGetter_1')
window.addEventListener('message', (e) => {
  
  if(e.data?.type.startsWith("bo")){
    console.log(3333, e, focussedView.value)
    
    console.log(x())
    dataAdapter.UpdatePartial(3,{keyValuePairs: [{key: "children", value: [{"type": "childrenCollection", value: [4]}]}]})
    console.log(x())
    switch(e.data.action){
      case "create":
        dataAdapter.Create(e.data.value, 0, false)
        dataAdapter2.Create(e.data.value, 4, false)
        break
      case "delete":
        
        break
      
    }
  }
  
})






window.postMessage('devServerReady', '*')
  window.parent.postMessage({eventType: "Hello World"}, '*')
  //document.addEventListener('mousemove', (event) => forwardEvent(event, 'mousemove'))
  document.addEventListener('mousemove', (event) => sendAllEventData(event))
  document.addEventListener('mousemove', (e) => hoverView(e))
  function sendAllEventData(event: MouseEvent) {
    const nextView = findNextViewElement(event.target as Element)
    const nearestView = FindNearestView(event)
    window.parent.postMessage({eventType: "mousemove.nextView", data: {target: getMouseEventDetails(event), next: getMouseEventDetails(nextView), point: getMouseEventDetails(nearestView)}}, '*')
  }

  const focussedView = ref(null)
  const focussedViews = ref([])
  const hover = ref(false)

  function setFocussedView(e: MouseEvent){
    const nextView = findNextViewElement(e.target as Element)
    focussedView.value = nextView
    focussedViews.value = ([nextView])
  }
  function findNextViewElement(e: Element){
        
        let potentialElement = null;
        if(e.dataset.element != undefined){
                
            return e
        }
        else if(e.parentElement?.dataset.element != undefined){
            return e.parentElement
        }else{

            potentialElement = e?.closest('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }
            potentialElement = e?.querySelector('[data-element]');
            if(potentialElement != undefined){
                return potentialElement;
            }

            
        }
        return undefined;
    }

    function hoverViewSafe(id: number){
        const el = document.querySelector('[data-element="element_' + id + '"]');
      
        if(el == undefined){
            return;
        }
        el.classList.add('focussed-element');
        
        const oldHoverdElement = document.getElementsByClassName('focussed-element');
                for(let i = 0; i < oldHoverdElement.length; i++){
                    if( parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) != this.focussedViews.value[0]
                        && parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) != id){
                        oldHoverdElement[i].classList.remove('focussed-element');
                    }
                }
                /*
                const view = this.GetViews().find(c => c.id == id);
                
                
                this.hoveredView.value = view;
                this.FocussedViewService.hoveredView.value = view;

                */

    }
    function hoverView(e: MouseEvent){
        //const hover = this.disableHover
        if(hover.value != true){

            let potentialElement = FindNearestView(e);
            if(potentialElement != undefined){
                if(!potentialElement?.classList?.contains('development-root-component') && potentialElement != undefined && potentialElement.dataset.element != undefined){
                    const oldHoverdElement = document.getElementsByClassName('focussed-element');
                    for(let i = 0; i < oldHoverdElement.length; i++){
                        if( parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) 
                        != focussedViews.value[0]){
                            oldHoverdElement[i].classList.remove('focussed-element');
                        }
                    }
                    
                    //const el = this.GetViews().find(c => c.id == parseInt(potentialElement.dataset.element.replace('element_', '')));
                    
                    potentialElement.classList.add('focussed-element');

                    /*
                    this.hoveredView.value = el;
                    this.FocussedViewService.hoveredView.value = el;
                    */
                }   
            }
        }
    }

    function FindNearestView(e: MouseEvent){
        const target = document.elementFromPoint(e.clientX, e.clientY)
        if(target == undefined || target == null){
            return undefined;
        }
        const elem = target.closest('[data-element]');
        return elem;
    }
</script>