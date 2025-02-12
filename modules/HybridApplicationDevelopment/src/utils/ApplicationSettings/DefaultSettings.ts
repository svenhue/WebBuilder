import { ApplicationSettings } from "alphautils";
import { injectable } from "inversify";

@injectable()
export class DefaultSettings extends ApplicationSettings{

    constructor(){
        super()
    }
    value = {
        screen: {
            defaultMobileWidth: '250px',
            defaultTabletWidth: '768px',
            defaultDesktopWidth: '100%',

            defaultMobileHeight: '480px',
            defaultTabletHeight: '480px',
            defaultDesktopHeight: '100%',
        }
    }
}