// Export the client tools
export * from './ClientTools';

// Export the AgenticChatIntegrationComponent
export { default as AgenticChatIntegrationComponent } from './AgenticChatIntegrationComponent.vue';

// Export the client-side tools
export * from './Tools/ClientSideTools';

// Export the CRUD views tools
export * from './Tools/CRUDViews';

// Export the CRUD sitemap tools
export * from './Tools/CRUDSitemap';

// Export the website creation strategy
export * from './WebsiteCreationStrategy';

// Import the tools
import { createDefaultToolRegistry, ClientSideToolRegistry } from './Tools/ClientSideTools';
import { registerAllCRUDViewsTools } from './Tools/CRUDViews';
import { registerAllCRUDSitemapTools } from './Tools/CRUDSitemap';

/**
 * Initialize the agentic tools
 * 
 * @param viewModel The runtime view model instance to use
 * @returns The tool registry
 */
export function initializeAgenticTools(viewModel: any): ClientSideToolRegistry {
  // Create the tool registry with default tools
  const registry = createDefaultToolRegistry({
    viewUpdateCallback: (view) => viewModel.updateView(view),
    pageUpdateCallback: (page) => viewModel.updatePage(page),
    viewUpdateByIdCallback: (viewId, updates) => viewModel.updateViewById(viewId, updates),
    pageUpdateByIdCallback: (pageId, updates) => viewModel.updatePageById(pageId, updates),
    viewDeleteCallback: (viewId) => viewModel.deleteView(viewId),
    pageDeleteCallback: (pageId) => viewModel.deletePage(pageId),
    getApplicationConfigCallback: () => viewModel.getApplicationConfig(),
    getPageCallback: (pageId) => viewModel.getPage(pageId),
    getViewCallback: (viewId) => viewModel.getView(viewId),
    previewCallback: () => viewModel.previewApplication(),
    exportCallback: () => viewModel.exportApplication(),
    importCallback: (applicationJson) => viewModel.importApplication(applicationJson),
  });
  
  // Register the CRUD tools
  registerAllCRUDViewsTools(viewModel);
  registerAllCRUDSitemapTools(viewModel);
  
  return registry;
}
