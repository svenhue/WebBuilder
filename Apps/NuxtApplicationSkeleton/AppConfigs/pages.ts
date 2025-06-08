import { IApplicationConfiguration, IPageConfiguration } from "webbuilderalphautils";
import { r } from "~/tests/output/public/_nuxt/BJjtGlwS";

export  const config = {
  internationalization: {
    enabled: true,
    defaultLocale: 'de-DE',
    langDir: './AppConfigs/languages',
    locales: [{
      code: 'en-US',
      file: 'en-US.json'
    },
    {
      code: 'de-DE',
      file: 'de.json'
    }
    ]
  },
  networkConfigs:[
    {
      name: 'Application',
      
      url: 'http://localhost:5000'
    }
  ],
  deploymentMode: "spaclient",

  pages: [
    {
      id:1,
      clientOnly: true,
      name: 'index',
        route:{
          path: '/',
          name: 'index' 
        },
      requiresAuth:{
          auth:true
      },
      tag: 'component:RootLayout',
      isRoot: true,
      children:[
        {
          id: 24,
          tag: 'component:Login',
          isRoutable: true,
          route:{
            path: '/login',
            name: 'login',
            parentName: 'index'
          }
        },
        {
          name: 'WebCreator',
          id: 22,
           clientOnly: true,
          tag: 'component:WebCreator',
          isRoutable: true,
          route:{
            path: '/webcreator',
            name: 'webcreator',
            parentName: 'index'
          }
        },
        {
          name: 'marketplace',
          id: 7,
          tag: 'component:MarketplaceOverviewComponent',
          isRoutable: true,
          route:{
            path: '/marketplace',
            name: 'marketplace',
            parentName: 'index' 
          }
        },
        {
          id: 10,
          name: "TestChat",
          tag: 'component:ChatComponent',
          isRouteable: true,
          route:{
            path: '/chat',
            name: 'chat',
            parentName: 'index'
          }
        },
        {
          id:2,
           clientOnly: true,
          name: 'appdevelopment',
          tag: 'component:MainDevelopmentLayout',
          isRoutable: true,
          route:{
            path: '/appdevelopment',
            name: 'appdevelopment',
            parentName: 'index' 
          },
          children:[
            {
               clientOnly: true,
              name: 'development',
              id:4,
              tag: 'component:DevelopmentComponent',
              isRoutable: true,
              route:{
                path: ':appName',
                name: 'development',
                parentName: 'appdevelopment' 
              }
            }
          ]
        },
        {
          id:3,
           clientOnly: true,
          tag: 'component:CreateNewApplicationSolution',
          isRoutable: true,
          requiresAuth:{
            auth: true,
            redirect: '/login'
          },
          route:{
            path: '/createApp',
            name: 'createApp',
            parentName: 'index' 
          }
        },
      ]
    } 
  ] as Array<IPageConfiguration>

} 