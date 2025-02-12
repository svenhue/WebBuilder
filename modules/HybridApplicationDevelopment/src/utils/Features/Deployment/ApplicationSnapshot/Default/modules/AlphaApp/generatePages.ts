import { IApplicationConfiguration, IPageConfiguration, IViewConfiguration } from "alphautils";
import {  writeFileSync, mkdirSync, existsSync } from 'node:fs';
export function generatePages(pages: Array<IPageConfiguration>, config: IApplicationConfiguration){

    mkdirSync(__dirname + '/pages', { recursive: true })

    for(const pageX of pages){
        createPage(pageX, config)
    }
    
    
}
function createPage(page:IPageConfiguration | IViewConfiguration, config: IApplicationConfiguration){

    const path = __dirname +  '/pages' + page.route.path.replace(':', '') + '.vue'
    let pageFile = ''
    
    if(page?.isRoot == true){
        pageFile = createPageFile(page as IPageConfiguration, config)
    }else{
        pageFile = createClientSidePageFile(page as IViewConfiguration)
    }

    const lastIndexOfSlash = path.lastIndexOf('/')

    if(!existsSync(path.substring(0, lastIndexOfSlash))){
        mkdirSync(path.substring(0, lastIndexOfSlash), {recursive: true})
    }

    writeFileSync(path, pageFile, {recursive: true})

    if(page?.views != undefined){
        for(const view of page.views){
            createPage(view, config)
        }
    }

}



function createClientSidePageFile(view: IViewConfiguration){

    return  `
  
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
}

function createPageFile(page: IPageConfiguration, config: IApplicationConfiguration){

    return  `
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
}