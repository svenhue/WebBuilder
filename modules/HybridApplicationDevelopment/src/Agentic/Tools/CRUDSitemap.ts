import { clientToolsManager, IClientTool } from '../ClientTools';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';
import { IPageConfiguration } from 'alphautils';

/**
 * Register CRUD sitemap tools with the tools manager
 * 
 * @param viewModel The runtime view model
 */
export function registerCRUDSitemapTools(viewModel: RunTimeVueApplicationViewModel) {
  // Register the create page tool
  clientToolsManager.registerTool(createCreatePageTool(viewModel));
  
  // Register the update page tool
  clientToolsManager.registerTool(createUpdatePageTool(viewModel));
  
  // Register the delete page tool
  clientToolsManager.registerTool(createDeletePageTool(viewModel));
  
  // Register the get page tool
  clientToolsManager.registerTool(createGetPageTool(viewModel));
  
  // Register the get all pages tool
  clientToolsManager.registerTool(createGetAllPagesTool(viewModel));
  
  // Register the get sitemap tool
  clientToolsManager.registerTool(createGetSitemapTool(viewModel));
}

/**
 * Create a tool for creating pages
 * 
 * @param viewModel The runtime view model
 * @returns The create page tool
 */
function createCreatePageTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_create_page',
    description: 'Create a new page in the application',
    parameters: {
      name: {
        type: 'string',
        description: 'The name of the page',
        required: true,
      },
      path: {
        type: 'string',
        description: 'The path of the page',
        required: true,
      },
      title: {
        type: 'string',
        description: 'The title of the page',
        required: true,
      },
      description: {
        type: 'string',
        description: 'The description of the page',
        required: false,
      },
      meta: {
        type: 'object',
        description: 'The meta data of the page',
        required: false,
      },
      requiresAuth: {
        type: 'boolean',
        description: 'Whether the page requires authentication',
        required: false,
      },
    },
    execute: async (args: any) => {
      console.log('Creating page:', args);
      
      try {
        // Create a page configuration
        const pageConfig: IPageConfiguration = {
          id: Date.now(),
          contextid: 0,
          name: args.name,
          route: {
            path: args.path,
            name: args.name.toLowerCase().replace(/\s+/g, '-'),
          },
          type: 'page',
          tag: 'div',
          requiresAuth: {
            auth: args.requiresAuth || false,
          },
          properties: {
            imageSrc: '',
            iconName: '',
            showIf: '',
          },
          class: [],
          value: [],
          views: [],
          meta: {
            title: args.title,
            description: args.description || '',
            keywords: args.meta?.keywords || [],
            ...args.meta,
          },
          head: {
            scripts: [],
          },
          css: '',
          boName: 'Page',
          stateChangePublisherId: 0,
        };
        
        // Add the page
        const [success] = viewModel.AddPage(pageConfig);
        
        if (!success) {
          throw new Error('Failed to add page');
        }
        
        return {
          page: pageConfig,
          message: `Created page: ${args.name} at path: ${args.path}`,
        };
      } catch (error) {
        console.error('Error creating page:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for updating pages
 * 
 * @param viewModel The runtime view model
 * @returns The update page tool
 */
function createUpdatePageTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_update_page',
    description: 'Update an existing page',
    parameters: {
      id: {
        type: 'number',
        description: 'The ID of the page to update',
        required: true,
      },
      updates: {
        type: 'object',
        description: 'The updates to apply to the page',
        required: true,
      },
    },
    execute: async (args: any) => {
      console.log('Updating page:', args);
      
      try {
        // Find the page
        const pages = viewModel.GetPageEntitys().value;
        const page = pages.find(p => p.id === args.id);
        
        if (!page) {
          throw new Error(`Page not found: ${args.id}`);
        }
        
        // Convert updates to key-value pairs
        const keyValuePairs = [];
        for (const key in args.updates) {
          if (args.updates.hasOwnProperty(key)) {
            keyValuePairs.push({
              key,
              value: args.updates[key]
            });
          }
        }
        
        // Update the page
        const [success] = viewModel.UpdatePage(args.id, keyValuePairs);
        
        if (!success) {
          throw new Error(`Failed to update page: ${args.id}`);
        }
        
        return {
          page,
          message: `Updated page: ${args.id}`,
        };
      } catch (error) {
        console.error('Error updating page:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for deleting pages
 * 
 * @param viewModel The runtime view model
 * @returns The delete page tool
 */
function createDeletePageTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_delete_page',
    description: 'Delete an existing page',
    parameters: {
      id: {
        type: 'number',
        description: 'The ID of the page to delete',
        required: true,
      },
    },
    execute: async (args: any) => {
      console.log('Deleting page:', args);
      
      try {
        // Find the page
        const pages = viewModel.GetPageEntitys().value;
        const page = pages.find(p => p.id === args.id);
        
        if (!page) {
          throw new Error(`Page not found: ${args.id}`);
        }
        
        // Delete the page
        const [success] = viewModel.DeletePage(args.id);
        
        if (!success) {
          throw new Error(`Failed to delete page: ${args.id}`);
        }
        
        return {
          page,
          message: `Deleted page: ${args.id}`,
        };
      } catch (error) {
        console.error('Error deleting page:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting a page
 * 
 * @param viewModel The runtime view model
 * @returns The get page tool
 */
function createGetPageTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_page',
    description: 'Get a page by ID',
    parameters: {
      id: {
        type: 'number',
        description: 'The ID of the page to get',
        required: true,
      },
    },
    execute: async (args: any) => {
      console.log('Getting page:', args);
      
      try {
        // Find the page
        const pages = viewModel.GetPageEntitys().value;
        const page = pages.find(p => p.id === args.id);
        
        if (!page) {
          throw new Error(`Page not found: ${args.id}`);
        }
        
        return {
          page,
          message: `Got page: ${args.id}`,
        };
      } catch (error) {
        console.error('Error getting page:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting all pages
 * 
 * @param viewModel The runtime view model
 * @returns The get all pages tool
 */
function createGetAllPagesTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_all_pages',
    description: 'Get all pages in the application',
    parameters: {},
    execute: async (args: any) => {
      console.log('Getting all pages');
      
      try {
        // Get all pages
        const pages = viewModel.GetPageEntitys().value;
        
        return {
          pages,
          message: `Got ${pages.length} pages`,
        };
      } catch (error) {
        console.error('Error getting all pages:', error);
        throw error;
      }
    },
  };
}

/**
 * Create a tool for getting the sitemap
 * 
 * @param viewModel The runtime view model
 * @returns The get sitemap tool
 */
function createGetSitemapTool(viewModel: RunTimeVueApplicationViewModel): IClientTool {
  return {
    name: 'client_get_sitemap',
    description: 'Get the sitemap of the application',
    parameters: {},
    execute: async (args: any) => {
      console.log('Getting sitemap');
      
      try {
        // Get all pages
        const pages = viewModel.GetPageEntitys().value;
        
        // Create a sitemap
        const sitemap = pages.map(page => ({
          id: page.id,
          name: page.name,
          path: page.route.path,
          title: page.meta?.title || page.name,
          description: page.meta?.description || '',
          requiresAuth: page.requiresAuth?.auth || false,
        }));
        
        return {
          sitemap,
          message: `Got sitemap with ${sitemap.length} pages`,
        };
      } catch (error) {
        console.error('Error getting sitemap:', error);
        throw error;
      }
    },
  };
}

/**
 * Register all CRUD sitemap tools
 * 
 * @param viewModel The runtime view model instance to use
 */
export function registerAllCRUDSitemapTools(viewModel: RunTimeVueApplicationViewModel) {
  registerCRUDSitemapTools(viewModel);
}
