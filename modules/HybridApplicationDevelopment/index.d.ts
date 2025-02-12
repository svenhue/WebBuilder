

import { CSSBlendingModes } from './src/utils/Enums/CSSBlendingModes';
import { CSSBorderStyleValues } from './src/utils/Enums/CSSBorderStyleValues';
import { CSSFonts } from './src/utils/Enums/CSSFonts';
import { CSSFontWeights } from './src/utils/Enums/CSSFontWeights';
import { CSSObjectFits } from './src/utils/Enums/CSSObjectFits';
import { CSSPositionValues } from './src/utils/Enums/CSSPositionValues';
import { CSSSizeUnits } from './src/utils/Enums/CSSSizeUnits';

import { CSSDefinition } from './src/utils/Models/CSSDefinition';
import { CSSProperty } from './src/utils/Models/CSSProperty';
import {IApplicationScreen } from './src/utils/Models/Interfaces/IApplicationScreen';
import { IModel } from './src/utils/Models/Interfaces/IModel';
import { IQuasarOptions } from './src/utils/Models/Interfaces/IQuasarOptions';
import { IRouteDefinition } from './src/utils/Models/Interfaces/IRouteDefinition';
import { IRoutingOptions } from './src/utils/Models/Interfaces/IRoutingOptions';

import { ApplicationServices } from './src/utils/Services/ApplicationServices';
import { StyleManagerViewModel } from './src/ViewModels/StyleManagerViewModel';


import ElementOptionsComponent from './src/VueComponents/ElementOptions/ElementOptionsComponent.vue';
import StyleBackgroundComponent from './src/VueComponents/ElementStyleConfigurations/StyleBackgroundComponent.vue';
import StyleEffectsEditorComponent from './src/VueComponents/ElementStyleConfigurations/StyleEffectsEditorComponent.vue';
import StyleLayoutEditorComponent from './src/VueComponents/ElementStyleConfigurations/StyleLayoutEditorComponent.vue';
import StylePositionEditorComponent from './src/VueComponents/ElementStyleConfigurations/StylePositionEditorComponent.vue';
import StyleSizeEditorComponent from './src/VueComponents/ElementStyleConfigurations/StyleSizeEditorComponent.vue';
import StyleTypographyEditorComponent from './src/VueComponents/ElementStyleConfigurations/StyleTypographyComponent.vue';
import StyleSpacingEditorComponent from './src/VueComponents/ElementStyleConfigurations/StyleSpacingEditorComponent.vue';

import ActionConfigurationComponent from './src/VueComponents/UIActions/ActionConfigurationComponent.vue';
import EditActionComponent from './src/VueComponents/UIActions/EditActionComponent.vue';
import ShowUIActionListItemComponent from './src/VueComponents/UIActions/ShowUIActionListItemComponent.vue';

import ApplicationUIStructure from './src/VueComponents/ApplicationUIStructure.vue';
import CreateNewApplicationSolution from './src/VueComponents/CreateNewApplicationSolution.vue';
import CurrentApplicationRouteComponent from './src/VueComponents/CurrentApplicationRouteComponent.vue';
import DevelopmentComponent from './src/VueComponents/DevelopmentComponent.vue';
import DevelopmentContextBarComponent from './src/VueComponents/DevelopmentContextBarComponent.vue';
import DevelopmentOptionsDrawer     from './src/VueComponents/DevelopmentOptionsDrawer.vue';
import ElementStyleConfigurationComponent from './src/VueComponents/ElementStyleConfigurationComponent.vue';
import LeftDevelopmentOptionsBar from './src/VueComponents/LeftDevelopmentOptionsBar.vue';
import MainDevelopmentLayout from './src/VueComponents/MainDevelopmentLayout.vue';
import UIComponentPalette from './src/VueComponents/UIComponentPalette.vue';

import { HybridAppDevelopmentApplicationModule } from './src/HybridApplicationDevelopmentModule';


import { HybridDevelopmentAppComponentFactory } from './src/utils/HybridDevelopmentAppComponentFactory';
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>;    export default component
    }
declare module 'hybridappdev'{


    export {
        HybridAppDevelopmentApplicationModule,
        HybridDevelopmentAppComponentFactory,

    
        CSSBlendingModes,
        CSSBorderStyleValues,
        CSSFonts,
        CSSFontWeights,
        CSSObjectFits,
        CSSPositionValues,
        CSSSizeUnits,
        CSSDefinition,
        CSSProperty,
        IApplicationScreen,
        IModel,
        IQuasarOptions,
        IRouteDefinition,
        IRoutingOptions,
        ApplicationServices,

        StyleManagerViewModel,
        ElementOptionsComponent,
        StyleBackgroundComponent,
        StyleEffectsEditorComponent,
        StyleLayoutEditorComponent,
        StylePositionEditorComponent,
        StyleSizeEditorComponent,
        StyleTypographyEditorComponent,
        StyleSpacingEditorComponent,
        ActionConfigurationComponent,
        EditActionComponent,
        ShowUIActionListItemComponent,
        ApplicationUIStructure,
        CreateNewApplicationSolution,
        CurrentApplicationRouteComponent,
        DevelopmentComponent,
        DevelopmentContextBarComponent,
        DevelopmentOptionsDrawer,
        ElementStyleConfigurationComponent,
        LeftDevelopmentOptionsBar,
        MainDevelopmentLayout

    };
    
}


export {

    HybridAppDevelopmentApplicationModule,

    CSSBlendingModes,
    CSSBorderStyleValues,
    CSSFonts,
    CSSFontWeights,
    CSSObjectFits,
    CSSPositionValues,
    CSSSizeUnits,
    CSSDefinition,
    CSSProperty,
    IApplicationScreen,
    IModel,
    IQuasarOptions,
    IRouteDefinition,
    IRoutingOptions,
    ApplicationServices,
    StyleManagerViewModel,
    ElementOptionsComponent,
    StyleBackgroundComponent,
    StyleEffectsEditorComponent,
    StyleLayoutEditorComponent,
    StylePositionEditorComponent,
    StyleSizeEditorComponent,
    StyleTypographyEditorComponent,
    StyleSpacingEditorComponent,
    ActionConfigurationComponent,
    EditActionComponent,
    ShowUIActionListItemComponent,
    ApplicationUIStructure,
    CreateNewApplicationSolution,
    CurrentApplicationRouteComponent,
    DevelopmentComponent,
    DevelopmentContextBarComponent,
    DevelopmentOptionsDrawer,
    ElementStyleConfigurationComponent,
    LeftDevelopmentOptionsBar,
    MainDevelopmentLayout
};