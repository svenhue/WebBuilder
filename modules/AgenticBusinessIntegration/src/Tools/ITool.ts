
export interface ITool {
    execEnvironment: string; // client or server
    
    name:string
    description: string
    input_schema: {
      type: 'object' // "object" "string"
      properties: {
        location: {
          type: string,
          description: string
        }
      },
      required: string[] // ["location"] required information for tool use
    }
}