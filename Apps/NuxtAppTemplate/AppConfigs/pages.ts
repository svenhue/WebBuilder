export const config = {"name":"ee","ssr":false,
    
    "components":[],"mode":"shadow",
    "deploymentMode":"spaclient",
    
    "pages":[
        {
        "name":"Your Page","meta":{"title":"Your Page"},"role":"Landingpage","route":{"path":"/"},
        "views":[
            {"type":"viewdefinition:Application:DefaultRootComponent","tag":"component:DefaultRootComponent",
            "name":"Default Root Component_4","htmlattributes":{"data-element":"element_4"},
            "style":{"position":"relative","height":"100%","width":"100%"},
            "dataConfig":{},"properties":{"isactive":true},"isRoot":true,
            "id":5,"publicidentifier":"element_4","contextid":4,"boName":"ViewConfiguration"}
        ],
        "id":3,"contextid":4,"boName":"Page"
    }
],"globalVariables":{"vars":{"keyValuePairs":[{"key":"defaultTabletWidth","value":"768px"},{"key":"defaultDesktopWidth","value":"100%"},{"key":"defaultMobileHeight","value":"480px"},{"key":"defaultMobileWidth","value":"250px"},{"key":"defaultTabletHeight","value":"481px"},{"key":"defaultDesktopHeight","value":"100%"}]}},"stylesheets":{"colors":[{"key":"Brand_Primary","value":"#3170F8"},{"key":"Brand_Secondary","value":"#3D3D3D"},{"key":"Brand_Accent","value":"#FF4081"},{"key":"Brand_Dark","value":"#212121"},{"key":"Status_Success","value":"#4CAF50"},{"key":"Status_Warning","value":"#FFC107"},{"key":"Status_Error","value":"#F44336"},{"key":"Status_Info","value":"#2196F3"},{"key":"Text_Dark","value":"#212121"},{"key":"Text_Light","value":"#FFFFFF"}]},"networkConfigs":[{"name":"WebCreatorBackend","url":"https://localhost:44314/api/","authentication":{"mechanism":1,"tokenEndpoint":"https://localhost:44314/connect/token/","authEndpoint":"https://localhost:44314/connect/authorize","client_id":"WebCreator_App","client_secret":"","grant_type":"password"},"headers":{"Content-Type":"application/json"}}],"id":1,"contextid":2,"boName":"Application"}