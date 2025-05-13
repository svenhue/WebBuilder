import { clientToolsManager, IClientTool } from '../ClientTools';
import { IViewConfiguration } from 'alphautils';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';
import { useRuntimeVueApplicationViewModel } from '../../composables/useRuntimeVueApplicationViewModel';

/**
 * Register CRUD views tools with the tools manager
 * 
 * @param viewModel The runtime view model
 */
export function registerCRUDViewsTools(viewModel: RunTimeVueApplicationViewModel) {
  // Register the create view tool
  clientToolsManager.registerTool(createCreateViewTool(viewModel));
  
  // Register the update view tool
  clientToolsManager.registerTool(createUpdateViewTool(viewModel));
  
  // Register the delete view tool
  clientToolsManager.registerTool(createDeleteViewTool(viewModel));
  
  // Register the get view tool
  clientToolsManager.registerTool(createGetViewTool(viewModel));
  
  // Register the get all views tool
  clientToolsManager.registerTool(createGetAllViewsTool(viewModel));
  
  // Register the get view by type tool
  clientToolsManager.registerTool(createGetViewByTypeTool(viewModel));
}

/**
 * Create a tool for creating views
 * 
 * @param viewModel The runtime view model
 * @returns The create view tool
 */
function createCreateViewTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_create_view',
    description: 'Create a new view in the current page',
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
      parentId: {
        type: 'number',
        description: 'The ID of the parent view',
        required: false,
      },
    },
    execute: async (args: any) => {
      console.log('Creating view:', args);
      
      try {
        // Navigate to the page
        viewModel.NavigateToPage(args.pageId);
        
        // Create a view element
        const view = viewModel.createElement(args.type, {
          tag: args.tag,
          content: args.content || {},
          style: args.style || {},
          class: args.class || [],
          parentId: args.parentId,
        });
        
        // Add the view to the page
        const [success, newView] = viewModel.AddRawViewElement(view);
        
        if (!success) {
          throw new Error('Failed to add view element');
        }
        
        return {
          view: newView,
          message: `Created view of type: ${args.type} for page: ${args.pageId}`,
        };
      } catch (error) {
        console.error('Error creating view:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for updating views
 * 
 * @param viewModel The runtime view model
 * @returns The update view tool
 */
function createUpdateViewTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_update_view',
    description: 'Update an existing view',
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
      console.log('Updating view:', args);
      
      try {
        // Find the view
        const view = viewModel.GetViews().find(v => v.id === args.id);
        
        if (!view) {
          throw new Error(`View not found: ${args.id}`);
        }
        
        // Apply the updates
        const updatedView = { ...view, ...args.updates };
        
        // Update the view
        const result = viewModel.UpdateView(args.id, updatedView);
        
        return {
          view: updatedView,
          message: `Updated view: ${args.id}`,
        };
      } catch (error) {
        console.error('Error updating view:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for deleting views
 * 
 * @param viewModel The runtime view model
 * @returns The delete view tool
 */
function createDeleteViewTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_delete_view',
    description: 'Delete an existing view',
    parameters: {
      id: {
        type: 'number',
        description: 'The ID of the view to delete',
        required: true,
      },
    },
    execute: async (args: any) => {
      console.log('Deleting view:', args);
      
      try {
        // Find the view
        const view = viewModel.GetViews().find(v => v.id === args.id);
        
        if (!view) {
          throw new Error(`View not found: ${args.id}`);
        }
        
        // Delete the view
        const [success] = viewModel.DeleteElement(args.id);
        
        if (!success) {
          throw new Error(`Failed to delete view: ${args.id}`);
        }
        
        return {
          view,
          message: `Deleted view: ${args.id}`,
        };
      } catch (error) {
        console.error('Error deleting view:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting a view
 * 
 * @param viewModel The runtime view model
 * @returns The get view tool
 */
function createGetViewTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_view',
    description: 'Get a view by ID',
    parameters: {
      id: {
        type: 'number',
        description: 'The ID of the view to get',
        required: true,
      },
    },
    execute: async (args: any) => {
      console.log('Getting view:', args);
      
      try {
        // Find the view
        const view = viewModel.GetViews().find(v => v.id === args.id);
        
        if (!view) {
          throw new Error(`View not found: ${args.id}`);
        }
        
        return {
          view,
          message: `Got view: ${args.id}`,
        };
      } catch (error) {
        console.error('Error getting view:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting all views
 * 
 * @param viewModel The runtime view model
 * @returns The get all views tool
 */
function createGetAllViewsTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_all_views',
    description: 'Get all views in the current page',
    parameters: {
      pageId: {
        type: 'number',
        description: 'The ID of the page to get views from',
        required: false,
      },
    },
    execute: async (args: any) => {
      console.log('Getting all views:', args);
      
      try {
        // Navigate to the page if specified
        if (args.pageId) {
          viewModel.NavigateToPage(args.pageId);
        }
        
        // Get all views
        const views = viewModel.GetViews();
        
        return {
          views,
          message: `Got ${views.length} views`,
        };
      } catch (error) {
        console.error('Error getting all views:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting views by type
 * 
 * @param viewModel The runtime view model
 * @returns The get view by type tool
 */
function createGetViewByTypeTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_view_by_type',
    description: 'Get views by type in the current page',
    parameters: {
      type: {
        type: 'string',
        description: 'The type of the views to get',
        required: true,
      },
      pageId: {
        type: 'number',
        description: 'The ID of the page to get views from',
        required: false,
      },
    },
    execute: async (args: any) => {
      console.log('Getting views by type:', args);
      
      try {
        // Navigate to the page if specified
        if (args.pageId) {
          viewModel.NavigateToPage(args.pageId);
        }
        
        // Get views by type
        const views = viewModel.GetViews().filter(v => v.type === args.type);
        
        return {
          views,
          message: `Got ${views.length} views of type: ${args.type}`,
        };
      } catch (error) {
        console.error('Error getting views by type:', error);
        throw error;
      }
    },
  };
}

/**
 * Register all CRUD views tools
 * 
 * @param viewModel The runtime view model instance to use
 */
export function registerAllCRUDViewsTools(viewModel: RunTimeVueApplicationViewModel) {
  registerCRUDViewsTools(viewModel);
}
