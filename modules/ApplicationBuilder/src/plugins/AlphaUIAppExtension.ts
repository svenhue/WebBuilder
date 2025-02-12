import { App } from "vue";
import { VueApplication } from "alphautils/app/VueApplication.ts";
import * as config from "@appconfig"
import { DefaultApplicationServiceCollection } from "alphautils/app/ServiceCollections/DefaultApplicationServiceCollection.ts";

export default function AlphaUIAppExtension(app: App){ 
    var alphaApp = new VueApplication(config.default, undefined, app)
        .setup()
        .useStartup(new DefaultApplicationServiceCollection())
        .build()
        .mount();
    console.log(alphaApp)
}