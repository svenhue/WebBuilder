
export interface ITabbedContainerConfiguration {
    isRoutable: boolean;
    
    content:{
        initialTab: string;
    }
    appearance:{
        isVertical: boolean;
        outsideArrows: boolean;
        mobileArrows: boolean;
        breakpoint: number | string;
        leftIcon: string;
        stretch: boolean;
        noCaps: boolean;
        activeClass: string;
        contentClass: string;
        dense: boolean;
    }

}