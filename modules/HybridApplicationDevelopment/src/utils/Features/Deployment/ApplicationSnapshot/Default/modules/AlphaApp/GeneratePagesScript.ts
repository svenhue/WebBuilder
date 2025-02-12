//@ts-ignore
//@ts-nocheck
import { IPageConfiguration, IViewConfiguration } from 'alphautils';
import {  writeFileSync, mkdirSync } from 'node:fs';
import { config } from '../../AppConfigs/pages.ts'



//for each page in config look mode (spa, ssg, ssr) and generate the page
//...
//nuxt will generate routes based on the page files

//for spa pages, add nested routes e.g to vue router


if(config == undefined){
  throw new Error('No pages found in config')
}

if(config.deploymentMode == undefined){
  throw new Error('No deployment mode found in config')
}

if(config.deploymentMode == 'spaclient'){

  if(config.pages.length != 1){
    throw new Error('Only one page is allowed in spaclient mode')
  }
  generatePageFile(config.pages[0])

}else {
  for(const page of pages){
    generatePageFile(page)
  }

}




function generatePageFile(page: IPageConfiguration){
    const pageName = page.name;

    const filePath = './pages/' + createFileName(page) 
    const pageFile = `
        <template>
            <div ref="templateRef">
                <ComponentTreeBase :view="page.config.value" :isPage="true" :contextid="page.config.value.contextid" :resolver="resolver" />
                <NuxtPage :contextid="page.config.value.contextid"></NuxtPage>
            </div>
        </template>


        <script setup lang="ts">
       
        //import { useHead } from 'unhead'
        import { ref } from 'vue'
        import { Page,IPageConfiguration } from 'alphautils'
        import   {ComponentTreeBase}   from 'alphaviewlibrary'
        import { ComponentResolver } from '@src/utils/ComponentResolver'
        ${config.deploymentMode == 'spaclient' ? `import { useRouter } from 'vue-router'` : ''}


        definePageMeta({
          middleware:[
            ${page.requiresAuth.auth == true ? '"auth"' : ''}
          ],
          auth: { requiresAuth: ${page.requiresAuth.auth}, redirect:"${page.requiresAuth.redirect ?? '/login'}"}
        })

        const templateRef = ref<HTMLElement>(null)
        const pageconfig = ${JSON.stringify(page)} as IPageConfiguration

        const resolver = new ComponentResolver()
        const page = new Page(
            pageconfig, 
            templateRef
            
            ${config.deploymentMode == 'spaclient' ? ',useRouter(),resolver' : ''}
            )

        </script>
    `


    if(!page.route.path.includes(':')){
      console.log(`Writing file to ${filePath}`)
      //mkdirSync(filePath.replace(`${pageName}.vue`, ''), {recursive: true})
      writeFileSync(filePath, pageFile, {})
    }

    if(config.deploymentMode == 'spaclient'){
      for(const view of page.views.filter(v => v.isRoutable == true)){
        createClientSideFileRoute(page, view)
      }
    }
    return pageFile;
}


function createClientSideFileRoute(page: IPageConfiguration, view: IViewConfiguration){

  let filePath = '';

  

  function createParentPath(view: IViewConfiguration){
    
    if(view.route.parentName == undefined){
      return;
    }
    
    let parent = page.views.find(v => v.route?.name == view.route?.parentName) 

    if(parent == undefined){
      parent = page?.route.name == view.route?.parentName ? page : undefined
    }

    filePath = `${parent.route.name}/` + filePath
    console.log(filePath)
    
    createParentPath(parent)
  }

  
  createParentPath(view)


  const pageFile = `
  
    <template>
      <BaseViewTreeRenderer :view="useViewConfiguration(props.contextid, viewId).view.value" :contextid="props.contextid" :resolver="resolver" />
    </template>


    <script setup lang="ts">
    import { useViewConfiguration } from 'alphautils' 
    import   {BaseViewTreeRenderer}   from 'alphaviewlibrary'
    import { ComponentResolver } from '@src/utils/ComponentResolver'
    
    const props = defineProps({
      contextid: {
        type: Number,
        required:true
      }
    })
    const resolver = new ComponentResolver()
    const viewId = ${JSON.stringify(view.id)} as Number
    

    </script>
`
 
  filePath = './pages/' + filePath

  if(!view.route.path.includes(':')){
    mkdirSync(filePath.replace(`${view.route.name}.vue`, ''), {recursive: true})
    filePath += createFileName(view)
  }else{
    
    mkdirSync(filePath +  view.route.parentName + `${view.route.name}`, {recursive: true})
    filePath += createFileName(view)  
  }
  
  
  writeFileSync(filePath, pageFile, {})
    
}

function createFileName(view: IViewConfiguration | IPageConfiguration){
  
  if(view.route?.name == undefined){
    throw new Error('No route name found in view')
  }
  let fileName = view.route.name

  const matches = view.route.path.match(/:/g)
  
  if(matches != null){
    const routeParams =  getWordsAfterCombinations(view.route.path)
    
    for(const param of routeParams){
      fileName = `[${param}]`
    }
  }
  return fileName + '.vue'
}

function getWordsAfterCombinations(input: string): string[] {
  const combinations = ["/:"];
  const words: string[] = [];

  if(combinations.length > 1){
    throw new Error('Only one combination is allowed')
  }

  for (let combo of combinations) {
      let startIndex = input.indexOf(combo);
      while (startIndex !== -1) {
          startIndex += combo.length;
          let endIndex = input.indexOf('/', startIndex);
          if (endIndex === -1) {
              endIndex = input.length;
          }
          words.push(input.substring(startIndex, endIndex).trim());
          startIndex = input.indexOf(combo, startIndex);
      }
  }

  return words;
}


function createFileAndDir(view: IViewConfiguration | IPageConfiguration){

  if(view.route?.path == undefined || view.route.path.includes(':') == false){
    return;
  }




}
export { generatePageFile }