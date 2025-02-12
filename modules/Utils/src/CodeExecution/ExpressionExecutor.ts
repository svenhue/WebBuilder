import { ComputedRef, computed } from 'vue';
import { IExecutionContextProvider } from './IExecutionContextProvider.js';
import { ExpressionValidator } from './ExpressionValidator.js';

//move the context resolve logic in value resolver. this should only execute a valid expression
export function ExpressionExecutor(contextProvider: IExecutionContextProvider, contextid: number, expression: string, requestingComponent? ) : ComputedRef<string | number | boolean>{

    if(ExpressionValidator.ValidateExpression(expression) === false){
        throw new Error('Invalid expression');
    }
    
    const start = expression.indexOf('{{')
    const end = expression.lastIndexOf('}}')
    expression = expression.substring(start + 2, end).trim()

    return computed(() => {
        const {components, variables, colors, component, app} = contextProvider.GetContext(contextid, requestingComponent)
        const result = executeNestedExpressions(expression, components, variables, colors, component, app);
        try{
            //todo: log tthis
            return new Function('components', 'variables', 'colors', 'component', 'app',  'return ' + result)(components, variables, colors, component, app)
        }catch{
            return result;
        }
    });

    function executeNestedExpressions(expression: string, components, variables, colors, component, app){
        const variablePattern = /(?<=variables\.)[\w-]+(?=(\.|$|\s))/g;
        const componentPattern = /(?<=components\.)[\w-]+(?=(\.|$|\s))/g;
        const colorPattern = /(?<=colors\.)[\w-]+(?=(\.|$|\s))/g;

        expression.match(variablePattern)?.forEach((match) => {
            const variableValue = variables[match];
            let result;
            if(ExpressionValidator.ValidateExpression(variableValue)){
                const start = variableValue.indexOf('{{')
                const end = variableValue.lastIndexOf('}}')
                result = variableValue.substring(start + 2, end).trim()
              
                result = new Function('variables', 'components', 'return ' + result)(variables, variables)
                if(ExpressionValidator.ValidateExpression(result)){
                    result = executeNestedExpressions(result, components, variables)
                }
            }else{
                result = variableValue
            }
            
            expression = expression.replace('variables.' + match, result);
        })
        
        expression.match(componentPattern)?.forEach((match) => {
            const indexOfComponentNameEndWithDot = expression.indexOf(match) + match.length
            const component = Function('components', 'variables', 'return ' + 'components.' + match)(components, variables)
            let result = component;
            let valuePath = ''

            for (let i = indexOfComponentNameEndWithDot; i < expression.length; i++) {
                if(expression[i] === '.'){
                    const nextDotIndex = expression.indexOf('.', i + 1)  != - 1 ? expression.indexOf('.', i + 1) :  expression.indexOf(' ', i + 1) != -1 ? expression.indexOf(' ', i + 1) : expression.indexOf(')', i + 1)  != -1 ? expression.indexOf(')', i + 1) : expression.length
                    const valueBetWeenDots = expression.substring(i + 1, nextDotIndex)
                   
                    if(result[valueBetWeenDots] === undefined){
                        
                    }else{
                        valuePath += '.' + valueBetWeenDots
                        result = result[valueBetWeenDots]
                    }
                   
                }
            }
            expression = expression.replace('components.' + match + valuePath, result);

            
        })

        expression.match(colorPattern)?.forEach((match) => {
            const color = Function('colors', 'variables', 'return ' + 'colors.' + match)(colors, variables)
            expression = expression.replace('colors.' + match, color);
        })

        expression.match(/(?<=component\.)[\w-]+(?=(\.|$|\s))/g)?.forEach((match) => {
            const indexOfComponentNameEndWithDot = expression.indexOf('.expression') + 10;
            const componentX = Function('component', 'colors', 'components', 'variables','app', 'return ' + 'component')(component, colors, components, variables, app)
            let valuePath = ''
            let result = componentX;
            for (let i = indexOfComponentNameEndWithDot; i < expression.length; i++) {
                if(expression[i] === '.'){
                    const nextDotIndex = expression.indexOf('.', i + 1)  != - 1 ? expression.indexOf('.', i + 1) :  expression.indexOf(' ', i + 1) != -1 ? expression.indexOf(' ', i + 1) : expression.indexOf(')', i + 1)  != -1 ? expression.indexOf(')', i + 1) : expression.length
                    const valueBetWeenDots = expression.substring(i + 1, nextDotIndex)
                   
                    if(result[valueBetWeenDots] === undefined){
                        
                    }else{
                        valuePath += '.' + valueBetWeenDots
                        result = result[valueBetWeenDots]
                    }
                   
                }
            }
            expression = expression.replace('component.' + match + valuePath, result);
        })

        expression.match(/(?<=app\.)[\w-]+(?=(\.|$|\s))/g)?.forEach((match) => {
            const indexOfComponentNameEndWithDot = expression.indexOf('.app') + 4;
            const componentX = Function('component', 'colors', 'components', 'variables', 'app', 'return ' + 'app')(component, colors, components, variables, app)
            let valuePath = ''
            let result = componentX;
            for (let i = indexOfComponentNameEndWithDot; i < expression.length; i++) {
                if(expression[i] === '.'){
                    const nextDotIndex = expression.indexOf('.', i + 1)  != - 1 ? expression.indexOf('.', i + 1) :  expression.indexOf(' ', i + 1) != -1 ? expression.indexOf(' ', i + 1) : expression.indexOf(')', i + 1)  != -1 ? expression.indexOf(')', i + 1) : expression.length
                    const valueBetWeenDots = expression.substring(i + 1, nextDotIndex)
                   
                    if(result[valueBetWeenDots] === undefined){
                        
                    }else{
                        valuePath += '.' + valueBetWeenDots
                        result = result[valueBetWeenDots]
                    }
                   
                }
            }
            expression = expression.replace('app.' + match + valuePath, result);
        })
        return expression;
    }

}

