
<script lang="ts">
import { type IComponentResolver } from './IComponentResolver.ts'
import { BaseServiceProvider, type IViewConfiguration } from 'alphautils';
import { BaseComponentResolver } from './BaseComponentResolver.ts'
import { BaseVueRenderer } from './BaseVueRenderer.ts'
import { IExecutionContextProvider } from './IExecutionContextProvider.js';
export default {
    props: {
        defaulttag: {
        type: String,
        required: false,
        default: 'tag:div'
        },
        contextid: {
            type: Number,
            required: false
        },
        view:{
            type: Object as () => IViewConfiguration,
            reuqired: false
        },
        resolver:{
            type: Object as () => IComponentResolver,
            required: false
        }
    },

    setup({defaulttag, contextid, view, resolver}){

        if(resolver == undefined){
            resolver = new BaseComponentResolver();
        }

        const {service, context} = BaseServiceProvider.ServiceWithAppContext<IExecutionContextProvider>("ExecutionContextProvider", contextid);
        return BaseVueRenderer(defaulttag,  contextid, view, resolver, service) 
    }

       
}     

</script>