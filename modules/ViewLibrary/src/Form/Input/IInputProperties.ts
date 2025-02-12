
export interface IInputProperties{
    inputValue?: string | number | boolean;
    inputType?: string; // text password textarea email search tel filenumber url time date
    rules: Array<object>;
    label: string;
    parameterName: string;
}