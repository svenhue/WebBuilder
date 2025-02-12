import { IApplicationConfiguration } from "alphautils";

export  const config = {
  internationalization: {
    enabled: true,
    defaultLocale: 'en',
    langDir: './AppConfigs/languages',
    locales: [{
      code: 'en',
      file: 'en.json'
    },
    {
      code: 'de',
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
      views:[
        {
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
          id:2,
          tag: 'component:MainDevelopmentLayout',
          isRoutable: true,
          route:{
            path: '/appdevelopment',
            name: 'appdevelopment',
            parentName: 'index' 
          }
        },
        {
          id:3,
          tag: 'component:CreateNewApplicationSolution',
          isRoutable: true,
          route:{
            path: '/createApp',
            name: 'createApp',
            parentName: 'index' 
          }
        },
        {
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

    } 
  ] } as IApplicationConfiguration