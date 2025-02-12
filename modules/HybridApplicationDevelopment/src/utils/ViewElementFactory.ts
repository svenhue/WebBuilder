//@ts-ignore
//@ts-nocheck
import { deepcopy } from 'alphautils';
import { BOService } from 'alphautils/src/Services/BOService';
import { IViewConfiguration } from 'alphautils/src/View/IViewConfiguration';
import { inject, injectable } from 'inversify';


@injectable()
export class ViewElementFactory {
  
  viewdefinitions: Array<IViewConfiguration> = [];
  templates: Array<IViewConfiguration> = [];
  boService: BOService
  private views: Array<IViewConfiguration> = [];

  constructor(
   @inject('BOService') boService: BOService,
  ){
    this.boService = boService;
  }
  public AddViewDefinitions(definitions?: Array<IViewConfiguration>){
    this.viewdefinitions.push(...definitions)
  }
  public AddTemplates(templates?: Array<IViewConfiguration>){
    //todo add viewtemplate by bo container, remove need for template store
    this.templates.push(...templates)
  }
  public createNode(type: string, node: IViewConfiguration, parentId: number, template?: boolean) {
    
    if(node == undefined){
      node = {} as IViewConfiguration;
    }
    if(this.viewdefinitions != undefined && type != undefined && type.startsWith('viewdefinition')){
      if(this.viewdefinitions.find((t) => t.type == type) != undefined){
        node = deepcopy(node, JSON.parse(JSON.stringify(this.viewdefinitions.find((t) => t.type == type))));
      }
    }

    if(template == true && node.skipTemplate != true){
      if(type != undefined){
        const specifictype = type.replace('viewdefinition:', '');
        const templateNode = this.templates.find(t => t.type.includes(specifictype) && t.type.includes('viewtemplate')) 
        if(templateNode != undefined){
          node = deepcopy(node, JSON.parse(JSON.stringify(templateNode)))
        }
      }
    }

    if (node?.specifications?.atomic == true) {
        node.htmlattributes['data-atomic'] = true;
    }

    if (node.htmlattributes == undefined) {
      node.htmlattributes = {};
    }

    if(node.properties == undefined){
      node.properties = {};
    }
    if(node.id == undefined){
      node = this.boService.NewId(node);
    }
    //needed for prod!?
    if(node.style == undefined){
      node.style = {};
    }
    node.htmlattributes['data-element'] = 'element_' + node.id;
    node.parentId = parentId;
    
    if (node.children != undefined) {
      let newNode = {} as IViewConfiguration;
      for (const child of node.children.filter(c => c.type != 'childrenCollection' && c.type != 'childrenCollection:templatePlaceholder')) {
        newNode  = this.createNode(child.type, child, node.id, template);
        
        this.views.push(newNode);

        if(node.children?.find(c => c.type == 'childrenCollection') == undefined){
            const collection = {
              type: 'childrenCollection',
              value: []
            }
            node.children.push(collection);
        }
        node.children.find(c => c.type == 'childrenCollection')?.value.push(newNode.id);        
        node.children = node.children.filter(c => c.type == 'childrenCollection');
      }
    }

    return node;
  }

  private AddTemplatePlaceholderChilds(node: IViewConfiguration){

    const collection = node.children?.find(c => c.type == 'childrenCollection:templatePlaceholder');
    if(collection == undefined){
      return;
    }
    let targetCollection = node.children.find(c => c.type == 'childrenCollection');

    if(targetCollection == undefined){
      targetCollection = {
        type: 'childrenCollection',
        value: []
      }
      
    }

    for(const childTemplatePlaceHolderStrong of collection.value){
        const child = this.views.find(v => v.templateIdentifier == childTemplatePlaceHolderStrong)
        targetCollection.value.push(child?.id);
    }
    node.children.push(targetCollection);
    node.children.splice(node.children.indexOf(collection), 1);
    
  }
  private SetPubblicIdentifier(node: IViewConfiguration){
    
      node.publicidentifier = 'element_' + node.id;
    
  }
  
  public Create(  
    type?: string,
    values?: IViewConfiguration,
    parentid?: number,
    useTemplateDeclarative?: boolean,
    ): Array<IViewConfiguration>{
      this.views = [];
      const node = this.createNode(type, values, parentid, useTemplateDeclarative);
      this.views.push(node);
      
      for(const view in this.views){
      
        this.AddTemplatePlaceholderChilds(this.views[view]);
        this.SetPubblicIdentifier(this.views[view]);
      }
      return this.views;
    }
  
}

