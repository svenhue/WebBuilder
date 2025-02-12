
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
      styles:{
        "background-color": "red",
      },
      content: "123123",
      tag: 'component:ButtonComponent',
      isRoot: true,
    } 
  ] 

} 