/* import  DefaultRootComponent from './src/Application/DefaultApplicationRootComponent.vue'
import ButtonComponent from './src/Basic/ButtonComponent.vue'
import DivBlockComponent from './src/Basic/DivBlockComponent.vue'
import ListComponent from './src/Basic/ListComponent.vue'
import ListItemComponent from './src/Basic/ListItemComponent.vue'
import SectionComponent from './src/Structure/SectionComponent.vue'
import TreeComponent from './src/Structure/TreeComponent.vue'
import QuickStackComponent from './src/Structure/QuickStackComponent.vue'
import ContainerComponent from './src/Structure/ContainerComponent.vue'
import TabbedContainerComponent from './src/Structure/TabbedContainerComponent.vue'
import  HeadingComponent  from './src/Typography/HeadingComponent.vue'
import ParagraphComponent from './src/Typography/ParagraphComponent.vue'
import BlockQuoteComponent from './src/Typography/BlockQuoteComponent.vue'
import TextLinkComponent from './src/Typography/TextLinkComponent.vue'
import * as ViewConfigs from './src/ViewLibrary.json'
import FormViewOptionsComponent from './src/Form/Form/FormViewOptionsComponent.vue'
import { ViewLibrary } from './src/vitePlugin.ts' */

import { type IComponentResolver } from './src/Renderer/IComponentResolver.js'
import { BaseComponentResolver } from './src/Renderer/BaseComponentResolver.js'
declare module 'alphaviewlibrary'{
    export{
        IComponentResolver, BaseComponentResolver
    
    }
}

export{
    IComponentResolver, BaseComponentResolver

}
//export { ViewLibrary, FormViewOptionsComponent, ViewConfigs, TextLinkComponent, BlockQuoteComponent, ParagraphComponent, HeadingComponent, TabbedContainerComponent, DefaultRootComponent, ButtonComponent, DivBlockComponent, ListComponent, ListItemComponent, SectionComponent, TreeComponent, QuickStackComponent, ContainerComponent }