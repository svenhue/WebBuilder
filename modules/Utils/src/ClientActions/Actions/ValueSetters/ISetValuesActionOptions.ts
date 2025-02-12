interface KeyValuePair{
    key: string;
    value: any;
}

export interface ISetValuesActionOptions{
    values: Array<KeyValuePair>;
    targetType: string;
    targetKey: string;

}

