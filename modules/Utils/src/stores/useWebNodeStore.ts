//@ts-nocheck
import { defineStore } from 'pinia';
import { createUniqueClientIdInContext } from '../composables/createUniqueClientIdInContext';
import { WebNodeContext } from '../View/interfaces';
import { useModellingStore } from './useModellingStore';
import { ref, computed } from 'vue';
import {
  createElements,
  updateElement,
  deleteElements,
  updateElements,
  deleteElement,
  createElement,
  updateValue,
  updateValues,
  createElementWithIdent
} from '../stores/storeUtils';
import { searchObjectInNestedArray } from '../composables/searchObjectInNestedArray';
import { IViewConfiguration } from '../View/IViewConfiguration';
/* eslint-disable @typescript-eslint/no-unused-vars */
export const useWebNodeStore = defineStore('webnodecontext', () => {
  const webnodecontexts = ref(Array<WebNodeContextContainer>());
  const registerednodeids = ref(Array<number>());

  function getContextWebNodes(contextid?: number, name?: string) {
    return computed(() => {
      if (name) {
        return webnodecontexts.value.find((c) => c.optionaluniquename == name)
          ?.webnodes;
      } else {
        return webnodecontexts.value.find((c) => c.contextid == contextid)
          ?.webnodes;
      }
    });
  }
  function getContextWebNodesbyType(
    contextid?: number,
    contextname?: string,
    types?: Array<string>
  ) {
    return computed(() => {
      const context: WebNodeContext = getContext(contextid, contextname).value;
      return context.webnodes.filter((n) => types.includes(n.type));
    });
  }
  function getContext(contextid?: number, name?: string) {
    return computed(() => {
      if (contextid != undefined) {
        return webnodecontexts.value.find((c) => c.contextid == contextid);
      } else {
        return webnodecontexts.value.find((c) => c.optionaluniquename == name);
      }
    });
  }
  function getTreeLevel(context: WebNodeContext, id: number) {
    return computed(() => {
      return context?.nodetree.find((n) => n.id === id);
    });
  }
  function byId(contextid: number, id: number): IViewConfiguration | undefined {
    return computed(() => {
      const el = webnodecontexts.value
        .find((c) => c.contextid == contextid)
        ?.webnodes?.find((n) => n.id == id);
      if (el != undefined) {
        return el;
      } else {
        return searchObjectInNestedArray(
          webnodecontexts.value.find((c) => c.contextid == contextid)?.webnodes,
          'children',
          'id',
          id
        );
      }
    });
  }
  function byKey(
    contextid: number,
    key: string,
    value: object
  ): IViewConfiguration | undefined {
    return computed(() => {
      return webnodecontexts.value
        .find((c) => c.contextid == contextid)
        ?.webnodes.find((n) => n[key] == value);
    });
  }
  function GetChildren(contextid:number, identifier: string){
    return computed(() => {
      return webnodecontexts.value.find((c) => c.contextid == contextid)?.webnodes.filter((n) => n.parent == identifier);
    })
  }

  function getChildren(context: WebNodeContext, node: IViewConfiguration) {
    return computed(() => {
      return context?.webnodes.filter((n) => n.parentId = n.id);
    });
  }
  function addWebNodeContext(name?: string): number {
    const newid: number = createUniqueClientIdInContext(
      webnodecontexts.value.map((c) => {
        return c.contextid;
      })
    );

    const newcontextcontainer = new WebNodeContextContainer(newid);
    newcontextcontainer.optionaluniquename = name;
    webnodecontexts.value.push(newcontextcontainer);
    return newid;
  }
  function deleteWebNodeContext(contextid: number): string | number {
    const index = webnodecontexts.value.findIndex(
      (c) => c.contextid == contextid
    );
    let message: string | number = webnodecontexts.value[index].contextid;
    try {
      webnodecontexts.value.splice(index, 1);
    } catch (e: object) {
      message = e;
    }
    return message;
  }

  function changeNodeContext(
    contextid: number,
    elementid: number,
    newcontextid: number,
    newparentid?: number
  ) {
    const node = byId(contextid, elementid);
    createElement(newcontextid, node, newparentid);
    const add = createElement;
    const delet = deleteElement;
    const find = byId;
    function iterateChildren(webnode) {
      if (webnode.children?.length >= 0) {
        for (const child of webnode.children) {
          const childnode = find(contextid, child);
          add(newcontextid, childnode, webnode.id);
          delet(contextid, child);
          if (childnode.children?.length >= 0) {
            iterateChildren(childnode);
          }
        }
      }
    }
    iterateChildren(node);
    deleteElement(contextid, elementid);
  }
  function createIdentifier() {
    const id: number | string = Math.max(...registerednodeids.value);
    if (id === -Infinity) {
      registerednodeids.value.push(0);
      return 0;
    } else if (id >= 0) {
      registerednodeids.value.push(id + 1);
      return id + 1;
    }
  }
  const deleteElement: deleteElement = function (
    contextid: number,
    element: IViewConfiguration,
    parentid?: number,
    trackChanges = false
  ) {
    const mstore = useModellingStore();
    if (
      mstore.focussedElements
        .find((f) => f.contextid == contextid)
        ?.elements.includes(element.id)
    ) {
      mstore.focussedElements
        .find((f) => f.contextid == contextid)
        ?.elements.splice(mstore.focussedElements.indexOf(element.id), 1);
    }
    const i: number = getContextWebNodes(contextid).value?.findIndex(
      (n) => n.id == element.id
    );
   
    // TODO delete all childs!
  };
  const deleteElements: deleteElements = function (
    contextid: number,
    elements: Array<IViewConfiguration>,
    placeholder?: undefined,
    trackChanges = false
  ) {
    const mstore = useModellingStore();
    for (const element of elements) {
      if (
        mstore.focussedElements
          .find((f) => f.contextid == contextid)
          ?.elements.includes(element.id)
      ) {
        mstore.focussedElements
          .find((f) => f.contextid == contextid)
          ?.elements.splice(mstore.focussedElements.indexOf(element.id), 1);
      }
      const i: number = getContextWebNodes(contextid).value?.findIndex(
        (n) => n.id == element.id
      );

      webnodecontexts.value
        .find((c) => c.contextid == contextid)
        ?.webnodes.splice(i, 1);

        // TODO delete all childs!
    }
  };
  const createElements: createElements = function (
    contextid: number,
    elements: Array<IViewConfiguration>,
    parentid?: number,
    trackChanges = false
  ) {
    for (const element of elements) {
      createElement(contextid, element, parentid);
    }
  };
  // new methods for state management
  const createElement: createElement = function (
    contextid: number,
    element: object,
    parentid?: number,
    trackChanges = false
  ) {
    element.id = createIdentifier();
    const context: WebNodeContext = webnodecontexts.value.find(
      (c) => c.contextid == contextid
    );
   
    context.webnodes.push(element);

    return element;
  };
  const createElementWithIdent: createElementWithIdent = function (
    contextid: number,
    element: object,
    identifier: number,
    parentid?: number,
    trackChanges = false
  ) {
    const context: WebNodeContext = webnodecontexts.value.find(
      (c) => c.contextid == contextid
    );
    element.id = identifier;
    context.webnodes.push(element);
    return element;
  }
  const updateElement: updateElement = function (
    contextid: number,
    element: object | number,
    updateValues: Array<updateValue>,
    trackChanges = false
  ) {
    let el;
    if (typeof element == 'number') {
      el = byId(contextid, element).value;
    } else {
      el = byId(contextid, element.id).value;
    }
    for (const update of updateValues) {
      //set(el, update.key, update.value);
    }
    return {
      success: false,
      message: '',
    };
  };
  const updateElements: updateElements = function (
    contextid: number,
    updates: Array<updateValues>,
    placeholder = undefined,
    trackChanges = false
  ) {
    for (const update of updates) {
      updateElement(contextid, update.elementid, update.values);
    }
    return {
      success: false,
      message: '',
    };
  };
  function validateStateManagementRestrictions(
    contextid: number,
    element: object
  ): boolean {
    if (Array.isArray(element)) {
      for (const el of element) {
        const result = validateElement(el);
        if (result == false) {
          return false;
        }
      }
    } else {
      validateElement(element);
    }
    function validateElement(element: object) {
      if (
        element.type.includes('environment') ||
        element.type.includes('env')
      ) {
        return false;
      }
    }
    return true;
  }
/* eslint-enable @typescript-eslint/no-unused-vars */
  return {
    GetChildren,
    validateStateManagementRestrictions,
    deleteElements,
    createElements,
    createElement,
    updateElement,
    updateElements,
    webnodecontexts,
    registerednodeids,
    getContextWebNodesbyType,
    getChildren,
    getContext,
    getContextWebNodes,
    getTreeLevel,
    byId,
    byKey,
    addWebNodeContext,
    deleteWebNodeContext,
    changeNodeContext,
    createIdentifier,
    deleteElement,
  };
});
