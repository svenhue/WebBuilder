
    
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
          definePageMeta({
            middleware:[
              "auth"
            ],
            auth: { requiresAuth: true, redirect:"/auth/login"}
          })

          const resolver = new ComponentResolver()
          const viewId = 3 as Number
          
      
          </script>
      