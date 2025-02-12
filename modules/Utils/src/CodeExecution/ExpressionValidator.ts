export class ExpressionValidator{
    //todo validate expression
    public static ValidateExpression(expression: string) : boolean{
        if(expression == undefined || expression == '' || expression == null || typeof expression != 'string'){
            return false;
        }
        if(expression.match(/{{.*}}/) != null){
            return true;
        }

        return false;
    }
}