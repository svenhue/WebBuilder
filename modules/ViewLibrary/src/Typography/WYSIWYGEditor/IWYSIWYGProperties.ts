
interface IDefinitionValue{
    tip: string
    icon: string
    label: string
    handler: (event: Event) => void,
    key: number,
    cmd: string,
    param: string,
    disabled: boolean,
    type: string,
    fixedLabel: boolean,
    fixedIcon: boolean,
    highlight: boolean,
}
interface IDefinition{
    key: string,
    value: Array<IDefinitionValue>
}


export interface IWYSIWYGHTMLProperties{
    fullscreen?: boolean;
    noRouteFullscreenExit?: boolean;
    paragraphTag?: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    square?: boolean;
    flat?: boolean;
    dense?: boolean;
    dark?: boolean;
    minHeight?: string;
    maxHeight?: string;
    height?: string;
    toolbarOutline?: boolean;
    toolbarPush?: boolean;
    toolbarRounded?: boolean;
    contentStyle?: CSSStyleDeclaration;
    contentClass?: string | string[];
    definitions?: Array<IDefinition>;
    fonts?: object;
    toolbar: Array<string>;
    toolbarColor?: string;
    toolbarTextColor?: string;
    toolbarToggleColor?: string;
    toolbarBg?: string;
    

}