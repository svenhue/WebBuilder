import { ITool } from '../ITool'

/**
 * Create a client-side tool registry
 */
export class ClientSideToolRegistry {
  public tools: Map<string, ITool> = new Map();

  /**
   * Register a tool
   */
  registerTool(tool: ITool): void {
    this.tools.set(tool.name, tool);
  }


  /**
   * Get a tool by name
   */
  getTool(name: string): ITool | undefined {
    return this.tools.get(name);
  }

  /**
   * Get all tools
   */
  getAllTools(): ITool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Execute a tool
   */
  async executeTool(name: string, ...args: any[]): Promise<any> {
    const tool = this.getTool(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }
    return tool.execute(...args);
  }
}