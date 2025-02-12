//@ts-ignore
//@ts-nocheck

import { injectable } from "inversify";
import { IRouteDefinition } from "src/View/Navigation/IRouteDefinition";

@injectable()
export class NavigationService{

    public navigate(route: IRouteDefinition): void{
        navigateTo(route)
    }
}