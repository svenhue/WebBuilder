//@ts-ignore
//@ts-nocheck
import { IApplicationConfiguration, IPageConfiguration } from 'alphautils';
import {  writeFileSync, lstatSync, mkdirSync, existsSync } from 'node:fs';
import { config } from '../../AppConfigs/pages.ts'

//for each page in config look mode (spa, ssg, ssr) and generate the page
//...
//nuxt will generate routes based on the page files

//for spa pages, add nested routes e.g to vue router

//todo dynamic pages with []
class PagesGenerator{
  
  private config: IApplicationConfiguration;

  constructor(){  
    if(config == undefined){
      throw new Error('No pages found in config')
    }
    
    if(config.deploymentMode == undefined){
      throw new Error('No deployment mode found in config')
    }
    this.config = config;
  }

  public generate(){
    
    if(this.config.deploymentMode == 'spaclient'){

      if(this.config.pages.length != 1){
        throw new Error('Only one page is allowed in spaclient mode')
      }
      
    }
    for(const page of this.config.pages){
        let path = page.route.name 
        this.generatePageFile(page, path)
      }
    
    }


    private generatePageFile(page: IPageConfiguration, path){

      let filePath = './pages'
      let pageFile; 
      
      
      if(page?.isRoot == true){
        pageFile = `
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
      }else{
        pageFile = `
    
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
          const viewId = ${JSON.stringify(page.id)} as Number
          
      
          </script>
      `
      }
  
      //index page
      if(page.route.path == '/'){
        mkdirSync(filePath + '/index', {recursive:true})
        console.log(filePath)
        writeFileSync(filePath + '/index.vue', pageFile)
        
      }else{
      
        
        const dirPath = filePath + '/' + path + '/' + page.route.name
        
        
  
        if(!existsSync(dirPath)){
          mkdirSync(dirPath)  
        }else{
          const stats = lstatSync(dirPath)
          if(!stats.isDirectory()){
            mkdirSync(dirPath)
          }
        }
        console.log("generated page" + dirPath + filePath)
        writeFileSync(dirPath + '/' + 'index.vue', pageFile)
      }

      if(page.route.name != 'index'){
        path += '/' + page.route.name
      }
  
      if(page.children != undefined){
        for(const child of page.children){
          this.generatePageFile(child, path)
        }
      }
  
      return pageFile;
  }
} 








const generator = new PagesGenerator()

generator.generate()