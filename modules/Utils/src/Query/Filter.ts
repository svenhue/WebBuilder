// @ts-nocheck
import { DataTypes } from '../Data/DataTypes.js';
import { FilterOperators } from './FilterOperators.js';
import { IFilterCondition } from './IFilterCondition.js';

interface IFilterDefaults{
    operator: FilterOperators;
}

export class Filter{
    field: string;
    value: string | number | boolean | Array<string> | Array<number> | {from : string, to: string};
    operator: string;
    type: DataTypes;
    jsCode: string;
    expression: IExpression; 
    key?: number
    constructor(condition: IFilterCondition){
        Object.assign(this, condition);
        if(this.type == undefined){
            this.type = DataTypes.string
        }
    }
    private SetClearValue(){
        switch(this.type){
            case DataTypes.string:
                this.value = '';
                break;
            case DataTypes.number:
                this.value = 0;
                break;
            case DataTypes.boolean:
                this.value = false;
                break;
            case DataTypes.array:
                this.value = [];
                break;
            case DataTypes.object:
                this.value = {};
                break;
            case DataTypes.date:
                this.value = '';
                break;
            case DataTypes.datetime:
                this.value = '';
                break;
            case DataTypes.time:
                this.value = '';
                break;
            default:
        }
    }
    public ChangeOperator(operator: FilterOperators){
        switch(operator){
            case FilterOperators.Contains:
                this.operator = FilterOperators.Contains;
                
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;

            case FilterOperators.Equal:
                this.operator = FilterOperators.Equal;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }

                break;
            case FilterOperators.Greater:
                this.operator = FilterOperators.Greater;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.GreaterOrEqual:
                this.operator = FilterOperators.GreaterOrEqual;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.Less:
                this.operator = FilterOperators.Less;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.LessOrEqual:
                this.operator = FilterOperators.LessOrEqual;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.NotEqual:
                this.operator = FilterOperators.NotEqual;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.StartsWith:
                this.operator = FilterOperators.StartsWith;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.EndsWith:
                this.operator = FilterOperators.EndsWith;
                if(Array.isArray(this.value) || typeof this.value == 'object'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.IsNull:
                this.operator = FilterOperators.IsNull;
                if(Array.isArray(this.value) || typeof this.value == 'object' || typeof this.value != 'boolean'){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.In:
                this.operator = FilterOperators.In;
                if(!Array.isArray(this.value) ){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.NotIn:
                this.operator = FilterOperators.NotIn;
                if(!Array.isArray(this.value) ){
                    this.SetClearValue();
                }
                break;
            case FilterOperators.Between:
                this.operator = FilterOperators.Between;
                this.value = {from: '', to: ''};
                break;
            default:
                this.operator = FilterOperators.Contains;
                break;
        }
    
    
    }
    public Update(value: object): void{
        this.value = value.value;
        if(value.field != this.field || value.operator != this.operator || value.type != this.type || value.jsCode != this.jsCode){
            this.field = value.field;
            this.operator = value.operator;
            this.type = value.type;
            this.jsCode = value.jsCode;
            this.BuildExpression();
        }
    }
    public static FromString(value: string, field?: string, defaults?: IFilterDefaults = { operator: FilterOperators.Contains} ): Filter{
        
        let [ operator, newValue ] = Filter.GetOperatorAndValueFromString(value);

        if(operator == undefined || newValue == undefined){
        
            if(defaults.operator == undefined){
                throw new Error('Operator cant be found');
            }
            operator = defaults.operator;
            newValue = value;
        
        }

        const typedValue = Filter.ConvertValueToType(newValue);
        return new Filter({
            value: typedValue,
            operator: operator,
            field: field,
            type: typeof typedValue,

        })
    }

    public static ConvertValueToType(value: string): string | number | boolean{
        if(value == 'true'){
            return true;
        }else if(value == 'false'){
            return false;
        }

        if(!isNaN(Number(value))){
            return Number(value);
        }
        return value;
    }
    public static CountOperators(value: string): boolean{
        
     
        return value
    }
    public static CheckStringIsValid(filter: string): boolean{
        const regex = Filter.CountOperators(filter)

        return regex;
    }
    public static GetFiltersFromString(filter: string): string[]{
        
        return filter
    }

    public static GetOperatorAndValueFromString(value:string){
        const equals = /Equals\("?([^"]+)"?\)/g;
        const notEquals = /NotEquals\("([^"]+)"\)/g;
        const greater = /Greater\("([^"]+)"\)/g;
        const greaterOrEqual = /GreaterOrEqual\("([^"]+)"\)/g;
        const less = /Less\("([^"]+)"\)/g;
        const lessOrEqual = /LessOrEqual\("([^"]+)"\)/g;
        const startsWith = /StartsWith\("([^"]+)"\)/g;
        const endsWith = /EndsWith\("([^"]+)"\)/g;
        const contains = /Contains\("([^"]+)"\)/g;
        const inOperator = /In\("([^"]+)"\)/g;
        const notIn = /NotIn\("([^"]+)"\)/g;
        const between = /Between\("([^"]+)"\)/g;
        const isNull = /IsNull\(\)/g;
        const isNotNull = /IsNotNull\(\)/g;
       
        if(equals.test(value) == true){
            const newValue = value.replace('Equals(', '').replace(')', '');
            return [FilterOperators.Equal, newValue];
        }
        else if (notEquals.test(value)){
            return FilterOperators.NotEqual;
        }else if (greater.test(value)){
            return FilterOperators.Greater;
        }else if (greaterOrEqual.test(value)){
            return FilterOperators.GreaterOrEqual;
        }
        else if (less.test(value)){
            return FilterOperators.Less;
        }
        else if (lessOrEqual.test(value)){
            return FilterOperators.LessOrEqual;
        }
        else if (startsWith.test(value)){
            return FilterOperators.StartsWith;
        }
        else if (endsWith.test(value)){
            return FilterOperators.EndsWith;
        }
        else if (contains.test(value)){
            return FilterOperators.Contains;
        }
        else if (inOperator.test(value)){
            return FilterOperators.In;
        }
        else if (notIn.test(value)){
            return FilterOperators.NotIn;
        }
        else if (between.test(value)){
            return FilterOperators.Between;
        }
        else if (isNull.test(value)){
            return FilterOperators.IsNull;
        }
        else if (isNotNull.test(value)){
            return FilterOperators.IsNotNull;
        }

        return [ undefined, undefined]

    }
    private BuildExpression(): void {
        if(this.jsCode){
            this.expression = this.jsCode;
        }else{
            switch(this.operator){
                case FilterOperators.Contains:
                    this.expression = function(value){return value[this.field].includes(this.value)}
                case FilterOperators.Equal:
                    this.expression = function(value){return value[this.field] == this.value}
                case FilterOperators.Greater:
                    this.expression = function(value){return value[this.field] > this.value}
                case FilterOperators.GreaterOrEqual:
                    this.expression = function(value){return value[this.field] >= this.value}
                case FilterOperators.Less:
                    this.expression = function(value){return value[this.field] < this.value}
                case FilterOperators.LessOrEqual:
                    this.expression = function(value){return value[this.field] <= this.value}
                case FilterOperators.NotEqual:
                    this.expression = function(value){return value[this.field] != this.value}
                case FilterOperators.StartsWith:
                    this.expression = function(value){return value[this.field].startsWith(this.value)}
                case FilterOperators.EndsWith:
                    this.expression = function(value){return value[this.field].endsWith(this.value)}
                case FilterOperators.IsNull:
                    this.expression = function(value){return value[this.field] == null}
                case FilterOperators.In:
                    this.expression = function(value){return value[this.field].includes(this.value)}
                case FilterOperators.NotIn:
                    this.expression = function(value){return !value[this.field].includes(this.value)}
                case FilterOperators.Between:
                    this.expression = function(value){return value[this.field] >= this.value && value[this.field] <= this.value}
                default:
                    this.expression = function(){return true}


            }
        }
    }

    public Run(value: object | string | number): boolean {
        if(!this.expression){
            this.BuildExpression();
        }
        return this.expression(value);
    }
}