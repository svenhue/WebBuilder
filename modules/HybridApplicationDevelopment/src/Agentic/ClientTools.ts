import { io, Socket } from 'socket.io-client';
import { IApplicationConfiguration } from 'alphautils/src/Application/IApplicationConfiguration';
import { IPageConfiguration } from 'alphautils/src/View/IPageConfiguration';
import { IViewConfiguration } from 'alphautils/src/View/IViewConfiguration';
import { IGlobalApplicationVariables } from 'alphautils/src/Application/Variables/IGlobalApplicationVariables';
import { 
  ClientSideToolRegistry, 
  createDefaultToolRegistry,
  IClientSideTool
} from './Tools/ClientSideTools';

/**
 * Interface for client tool parameters
 */
export interface IToolParameter {
  type: string;
  description: string;
  required?: boolean;
  default?: any;
}

/**
 * Interface for client tool definition
 */
export interface IClientTool {
  name: string;
  description: string;
  parameters: Record<string, IToolParameter>;
  execute: (args: any) => Promise<any>;
}

/**
 * Interface for tool execution request
 */
interface IToolExecutionRequest {
  name: string;
  args: any;
  requestId: string;
}

/**
 * Interface for tool execution result
 */
interface IToolExecutionResult {
  name: string;
  result: any;
  requestId?: string;
  success: boolean;
  websiteConfig?: IApplicationConfiguration;
  page?: IPageConfiguration;
  view?: IViewConfiguration;
  variables?: IGlobalApplicationVariables;
}

/**
 * ClientToolsManager class
 * 
 * This class manages client-side tools and their communication with the backend
 */
export class ClientToolsManager {
  private socket: Socket | null = null;
  private tools: Map<string, IClientTool> = new Map();
  private serverUrl: string;
  private isConnected: boolean = false;
  private pendingRequests: Map<string, (result: any) => void> = new Map();
  
  /**
   * Constructor
   * @param serverUrl The URL of the backend server
   */
  constructor(serverUrl: string = 'http://localhost:3001') {
    this.serverUrl = serverUrl;
  }
  
  /**
   * Set the server URL
   * @param url The URL of the backend server
   */
  public setServerUrl(url: string): void {
    this.serverUrl = url;
  }
  
  /**
   * Get the server URL
   * @returns The URL of the backend server
   */
  public getServerUrl(): string {
    return this.serverUrl;
  }
  
  /**
   * Connect to the backend server
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }
    
    try {
      this.socket = io(this.serverUrl);
      
      // Set up event listeners
      this.socket.on('connect', () => {
        console.log('Connected to AgenticWebBuilder server');
        this.isConnected = true;
        
        // Register all tools
        this.registerAllTools();
      });
      
      this.socket.on('disconnect', () => {
        console.log('Disconnected from AgenticWebBuilder server');
        this.isConnected = false;
      });
      
      this.socket.on('tool:execute_client', async (request: IToolExecutionRequest) => {
        console.log('Tool execution request received:', request);
        
        try {
          // Get the tool
          const tool = this.tools.get(request.name);
          
          if (!tool) {
            throw new Error(`Tool not found: ${request.name}`);
          }
          
          // Execute the tool
          const result = await tool.execute(request.args);
          
          // Send the result back to the server
          this.socket?.emit('tool:result', {
            name: request.name,
            result,
            requestId: request.requestId,
            success: true,
          });
        } catch (error) {
          console.error('Error executing tool:', error);
          
          // Send the error back to the server
          this.socket?.emit('tool:result', {
            name: request.name,
            result: null,
            requestId: request.requestId,
            success: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      });
      
      this.socket.on('tool:processed', (response: { requestId: string; name: string; success: boolean }) => {
        console.log('Tool result processed:', response);
        
        // Resolve the pending request
        const resolver = this.pendingRequests.get(response.requestId);
        if (resolver) {
          resolver(response);
          this.pendingRequests.delete(response.requestId);
        }
      });
      
      this.socket.on('tool:registered', (response: { name: string; success: boolean }) => {
        console.log('Tool registered:', response);
      });
      
      this.socket.on('tools:available', (response: { tools: any[] }) => {
        console.log('Available tools:', response.tools);
      });
    } catch (error) {
      console.error('Error connecting to server:', error);
      throw error;
    }
  }
  
  /**
   * Register a client-side tool
   * @param tool The tool to register
   */
  public registerTool(tool: IClientTool): void {
    // Add the tool to the local map
    this.tools.set(tool.name, tool);
    
    // Register the tool with the server if connected
    if (this.isConnected && this.socket) {
      this.socket.emit('tool:register', {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      });
    }
  }
  
  /**
   * Register all tools with the server
   */
  private registerAllTools(): void {
    if (!this.isConnected || !this.socket) {
      return;
    }
    
    // Register each tool
    for (const tool of this.tools.values()) {
      this.socket.emit('tool:register', {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      });
    }
  }
  
  /**
   * Execute a tool on the server
   * @param name The name of the tool to execute
   * @param args The arguments for the tool
   * @returns The result of the tool execution
   */
  public async executeServerTool(name: string, args: any): Promise<any> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to server');
    }
    
    return new Promise((resolve, reject) => {
      // Generate a request ID
      const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the resolver
      this.pendingRequests.set(requestId, resolve);
      
      // Set a timeout
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error('Tool execution timed out'));
      }, 30000); // 30 seconds timeout
      
      // Send the request
      this.socket?.emit('tool:execute', {
        name,
        args,
        requestId,
      });
      
      // Listen for the result
      this.socket?.once(`tool:result:${requestId}`, (result: IToolExecutionResult) => {
        clearTimeout(timeout);
        this.pendingRequests.delete(requestId);
        
        if (result.success) {
          resolve(result.result);
        } else {
          reject(new Error(result.result?.error || 'Tool execution failed'));
        }
      });
    });
  }
  
  /**
   * Get the list of available tools
   * @returns A promise that resolves to the list of available tools
   */
  public async getAvailableTools(): Promise<any[]> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to server');
    }
    
    return new Promise((resolve) => {
      this.socket?.emit('tools:list');
      
      this.socket?.once('tools:available', (response: { tools: any[] }) => {
        resolve(response.tools);
      });
    });
  }
  
  /**
   * Disconnect from the server
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

// Create and export a singleton instance of the client tools manager
export const clientToolsManager = new ClientToolsManager();

// Define some example client-side tools

/**
 * Create View Tool
 * This tool creates a view in the current page
 */
export const createViewTool: IClientTool = {
  name: 'client_create_view',
  description: 'Create a new view in the current page using the client-side component library',
  parameters: {
    pageId: {
      type: 'number',
      description: 'The ID of the page to add the view to',
      required: true,
    },
    type: {
      type: 'string',
      description: 'The type of the view',
      required: true,
    },
    tag: {
      type: 'string',
      description: 'The HTML tag of the view',
      required: true,
    },
    content: {
      type: 'object',
      description: 'The content of the view',
      required: false,
    },
    style: {
      type: 'object',
      description: 'The style of the view',
      required: false,
    },
    class: {
      type: 'array',
      description: 'The CSS classes of the view',
      required: false,
    },
  },
  execute: async (args: any) => {
    // In a real implementation, this would create a view using the client-side component library
    console.log('Creating view:', args);
    
    // Create a view object
    const view: IViewConfiguration = {
      id: Date.now(),
      contextid: args.pageId,
      type: args.type,
      tag: args.tag,
      requiresAuth: {
        auth: false,
      },
      properties: {
        imageSrc: '',
        iconName: '',
        showIf: '',
      },
      content: args.content || {},
      style: args.style || {},
      class: args.class || [],
      value: [],
      route: {
        path: '',
        name: '',
      },
      boName: 'View',
      stateChangePublisherId: 0,
    };
    
    return {
      view,
      message: `Created view of type: ${args.type} for page: ${args.pageId}`,
    };
  },
};

/**
 * Update View Tool
 * This tool updates a view in the current page
 */
export const updateViewTool: IClientTool = {
  name: 'client_update_view',
  description: 'Update an existing view using the client-side component library',
  parameters: {
    id: {
      type: 'number',
      description: 'The ID of the view to update',
      required: true,
    },
    updates: {
      type: 'object',
      description: 'The updates to apply to the view',
      required: true,
    },
  },
  execute: async (args: any) => {
    // In a real implementation, this would update a view using the client-side component library
    console.log('Updating view:', args);
    
    return {
      id: args.id,
      updates: args.updates,
      message: `Updated view: ${args.id} with updates: ${Object.keys(args.updates).join(', ')}`,
    };
  },
};

/**
 * Delete View Tool
 * This tool deletes a view in the current page
 */
export const deleteViewTool: IClientTool = {
  name: 'client_delete_view',
  description: 'Delete an existing view using the client-side component library',
  parameters: {
    id: {
      type: 'number',
      description: 'The ID of the view to delete',
      required: true,
    },
  },
  execute: async (args: any) => {
    // In a real implementation, this would delete a view using the client-side component library
    console.log('Deleting view:', args);
    
    return {
      id: args.id,
      message: `Deleted view: ${args.id}`,
    };
  },
};

// Chat message tool
export const chatMessageTool: IClientTool = {
  name: 'chat:message',
  description: 'Send a message to the AI assistant',
  parameters: {
    text: {
      type: 'string',
      description: 'The message text',
      required: true,
    },
    userId: {
      type: 'string',
      description: 'The user ID',
      required: true,
    },
  },
  execute: async (args: any) => {
    // In a real implementation, this would send a message to the AI assistant
    console.log('Sending message to AI assistant:', args);
    
    return {
      text: 'Message sent to AI assistant',
      userId: args.userId,
    };
  },
};

// Register the example tools
clientToolsManager.registerTool(createViewTool);
clientToolsManager.registerTool(updateViewTool);
clientToolsManager.registerTool(deleteViewTool);
clientToolsManager.registerTool(chatMessageTool);
