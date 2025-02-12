import { IMenuItemViewConfiguration } from './IMenuItemViewConfiguration.js';

export interface IMenuViewConfiguration{
    children: Array<IMenuItemViewConfiguration>
    
    properties:{
        target?: string // css selector  -> Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) or a DOM element it attaches the events to the specified DOM element (if it exists)
        noParentElement?: boolean,
        autoClose?: boolean,
        anchor: string, // top lefttop middletop righttop starttop endcenter leftcenter middlecenter rightcenter startcenter endbottom leftbottom middlebottom rightbottom startbottom end
        self: string // top lefttop middletop righttop starttop endcenter leftcenter middlecenter rightcenter startcenter endbottom leftbottom middlebottom rightbottom startbottom end

    }
}