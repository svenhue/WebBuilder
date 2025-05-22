import { z } from "zod";

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
    execute: (...args: any[]) => Promise<any>;
}


export const IToolSchema = z.object({
  execEnvironment: z.string(), // could be further restricted to 'client' | 'server'
  name: z.string(),
  description: z.string(),
  input_schema: z.object({
    type: z.literal("object"),
    properties: z.object({
      location: z.object({
        type: z.string(),
        description: z.string()
      })
    }),
    required: z.array(z.string())
  }),
  execute: z.function().args(z.any()).returns(z.promise(z.any())).optional()
});