import { IDataContainer } from "../environment/IDataContainer";

interface INodeParameter{
    key: string;
    dataType: string;
    required: boolean;
    value: object | Array<object> | string | number | boolean
}

interface INodeInput{
    data: IDataContainer
    parameters: Array<INodeParameter>
}

export { type INodeInput, type INodeParameter }