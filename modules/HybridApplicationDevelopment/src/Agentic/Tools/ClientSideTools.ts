import { ITool } from 'agenticBusinessIntegration';
import { IApplicationConfiguration } from 'alphautils/src/Application/IApplicationConfiguration';
import { IPageConfiguration } from 'alphautils/src/View/IPageConfiguration';
import { IViewConfiguration } from 'alphautils/src/View/IViewConfiguration';

/**
 * Create a new view in the application
 */
export class CreateViewTool implements ITool {
  name = 'create_view';
  description = 'Create a new view in the application';

  constructor(private viewUpdateCallback: (view: IViewConfiguration) => void) {}

  async execute(
    pageId: number,
    type: string,
    tag: string,
    content?: any,
    style?: any,
    cssClass?: string[]
  ): Promise<IViewConfiguration> {
    console.log(`Creating view of type: ${type} for page: ${pageId}`);

    // Create a basic view configuration
    const view: IViewConfiguration = {
      id: Date.now(),
      contextid: 0,
      type,
      tag,
      route: {
        path: '',
        name: '',
      },
      requiresAuth: {
        auth: false,
      },
      properties: {
        imageSrc: '',
        iconName: '',
        showIf: '',
      },
      content: content || {},
      style: style || {},
      class: cssClass || [],
      value: [],
      boName: 'View',
      stateChangePublisherId: 0,
    };
    
    // Call the callback to update the view in the application
    this.viewUpdateCallback(view);
    
    return view;
  }
}

/**
 * Create a new page in the application
 */
export class CreatePageTool implements ITool {
  name = 'create_page';
  description = 'Create a new page in the application';

  constructor(private pageUpdateCallback: (page: IPageConfiguration) => void) {}

  async execute(
    websiteId: number,
    name: string,
    path: string,
    title: string,
    description?: string
  ): Promise<IPageConfiguration> {
    console.log(`Creating page: ${name} for website: ${websiteId}`);
    
    // Create a basic page configuration
    const page: IPageConfiguration = {
      id: Date.now(),
      contextid: 0,
      name,
      route: {
        path,
        name: path.replace(/\//g, '').toLowerCase(),
      },
      type: 'page',
      tag: 'div',
      requiresAuth: {
        auth: false,
      },
      properties: {
        imageSrc: '',
        iconName: 'description',
        showIf: '',
      },
      meta: {
        title,
        description: description || '',
        keywords: [name],
      },
      head: {
        scripts: [],
      },
      class: [],
      value: [],
      views: [
        // Header
        {
          id: Date.now() + 1,
          contextid: 0,
          type: 'viewtemplate:Layout:HeaderComponent',
          tag: 'component:HeaderComponent',
          isRoot: true,
          route: {
            path: '',
            name: '',
          },
          requiresAuth: {
            auth: false,
          },
          properties: {
            imageSrc: '',
            iconName: '',
            showIf: '',
          },
          class: [],
          value: [],
          children: [],
          boName: 'View',
          stateChangePublisherId: 0,
        },
        // Content section
        {
          id: Date.now() + 2,
          contextid: 0,
          type: 'viewdefinition:Structure:SectionComponent',
          tag: 'tag:section',
          route: {
            path: '',
            name: '',
          },
          requiresAuth: {
            auth: false,
          },
          properties: {
            imageSrc: '',
            iconName: '',
            showIf: '',
          },
          style: {
            padding: '50px 20px',
            'max-width': '1200px',
            margin: '0 auto',
          },
          class: [],
          value: [],
          boName: 'View',
          stateChangePublisherId: 0,
          children: [
            {
              id: Date.now() + 3,
              contextid: 0,
              type: 'viewdefinition:Typography:HeadingComponent',
              tag: 'tag:h1',
              route: {
                path: '',
                name: '',
              },
              requiresAuth: {
                auth: false,
              },
              properties: {
                imageSrc: '',
                iconName: '',
                showIf: '',
              },
              content: {
                text: title,
              },
              style: {
                'margin-bottom': '30px',
              },
              class: [],
              value: [],
              boName: 'View',
              stateChangePublisherId: 0,
            },
            {
              id: Date.now() + 4,
              contextid: 0,
              type: 'viewdefinition:Typography:ParagraphComponent',
              tag: 'tag:p',
              route: {
                path: '',
                name: '',
              },
              requiresAuth: {
                auth: false,
              },
              properties: {
                imageSrc: '',
                iconName: '',
                showIf: '',
              },
              content: {
                text: description || 'Content goes here',
              },
              class: [],
              value: [],
              boName: 'View',
              stateChangePublisherId: 0,
            },
          ],
        },
        // Footer
        {
          id: Date.now() + 5,
          contextid: 0,
          type: 'viewtemplate:Layout:FooterComponent',
          tag: 'component:FooterComponent',
          route: {
            path: '',
            name: '',
          },
          requiresAuth: {
            auth: false,
          },
          properties: {
            imageSrc: '',
            iconName: '',
            showIf: '',
          },
          style: {
            'background-color': '#333',
            color: '#fff',
            padding: '30px 20px',
            'text-align': 'center',
          },
          class: [],
          value: [],
          children: [],
          boName: 'View',
          stateChangePublisherId: 0,
        },
      ],
      css: '',
      boName: 'Page',
      stateChangePublisherId: 0
    };
    
    // Call the callback to update the page in the application
    this.pageUpdateCallback(page);
    
    return page;
  }
}

/**
 * Update a view in the application
 */
export class UpdateViewTool implements ITool {
  name = 'update_view';
  description = 'Update a view in the application';

  constructor(private viewUpdateCallback: (viewId: number, updates: Partial<IViewConfiguration>) => void) {}

  async execute(
    viewId: number,
    updates: Partial<IViewConfiguration>
  ): Promise<boolean> {
    console.log(`Updating view: ${viewId}`);
    
    // Call the callback to update the view in the application
    this.viewUpdateCallback(viewId, updates);
    
    return true;
  }
}

/**
 * Update a page in the application
 */
export class UpdatePageTool implements ITool {
  name = 'update_page';
  description = 'Update a page in the application';

  constructor(private pageUpdateCallback: (pageId: number, updates: Partial<IPageConfiguration>) => void) {}

  async execute(
    pageId: number,
    updates: Partial<IPageConfiguration>
  ): Promise<boolean> {
    console.log(`Updating page: ${pageId}`);
    
    // Call the callback to update the page in the application
    this.pageUpdateCallback(pageId, updates);
    
    return true;
  }
}

/**
 * Delete a view from the application
 */
export class DeleteViewTool implements ITool {
  name = 'delete_view';
  description = 'Delete a view from the application';

  constructor(private viewDeleteCallback: (viewId: number) => void) {}

  async execute(viewId: number): Promise<boolean> {
    console.log(`Deleting view: ${viewId}`);
    
    // Call the callback to delete the view from the application
    this.viewDeleteCallback(viewId);
    
    return true;
  }
}

/**
 * Delete a page from the application
 */
export class DeletePageTool implements ITool {
  name = 'delete_page';
  description = 'Delete a page from the application';

  constructor(private pageDeleteCallback: (pageId: number) => void) {}

  async execute(pageId: number): Promise<boolean> {
    console.log(`Deleting page: ${pageId}`);
    
    // Call the callback to delete the page from the application
    this.pageDeleteCallback(pageId);
    
    return true;
  }
}

/**
 * Get the current application configuration
 */
export class GetApplicationConfigTool implements ITool {
  name = 'get_application_config';
  description = 'Get the current application configuration';

  constructor(private getApplicationConfigCallback: () => IApplicationConfiguration) {}

  async execute(): Promise<IApplicationConfiguration> {
    console.log('Getting application configuration');
    
    // Call the callback to get the application configuration
    return this.getApplicationConfigCallback();
  }
}

/**
 * Get a page by ID
 */
export class GetPageTool implements ITool {
  name = 'get_page';
  description = 'Get a page by ID';

  constructor(private getPageCallback: (pageId: number) => IPageConfiguration | undefined) {}

  async execute(pageId: number): Promise<IPageConfiguration | undefined> {
    console.log(`Getting page: ${pageId}`);
    
    // Call the callback to get the page
    return this.getPageCallback(pageId);
  }
}

/**
 * Get a view by ID
 */
export class GetViewTool implements ITool {
  name = 'get_view';
  description = 'Get a view by ID';

  constructor(private getViewCallback: (viewId: number) => IViewConfiguration | undefined) {}

  async execute(viewId: number): Promise<IViewConfiguration | undefined> {
    console.log(`Getting view: ${viewId}`);
    
    // Call the callback to get the view
    return this.getViewCallback(viewId);
  }
}

/**
 * Preview the application
 */
export class PreviewApplicationTool implements ITool {
  name = 'preview_application';
  description = 'Preview the application';

  constructor(private previewCallback: () => void) {}

  async execute(): Promise<boolean> {
    console.log('Previewing application');
    
    // Call the callback to preview the application
    this.previewCallback();
    
    return true;
  }
}


/**
 * Create a default tool registry with all tools
 */
export function createDefaultToolRegistry(
  callbacks: {
    viewUpdateCallback: (view: IViewConfiguration) => void;
    pageUpdateCallback: (page: IPageConfiguration) => void;
    viewUpdateByIdCallback: (viewId: number, updates: Partial<IViewConfiguration>) => void;
    pageUpdateByIdCallback: (pageId: number, updates: Partial<IPageConfiguration>) => void;
    viewDeleteCallback: (viewId: number) => void;
    pageDeleteCallback: (pageId: number) => void;
    getApplicationConfigCallback: () => IApplicationConfiguration;
    getPageCallback: (pageId: number) => IPageConfiguration | undefined;
    getViewCallback: (viewId: number) => IViewConfiguration | undefined;
    previewCallback: () => void;
    exportCallback: () => Promise<string>;
    importCallback: (applicationJson: string) => Promise<IApplicationConfiguration>;
  }
): ClientSideToolRegistry {
  const registry = new ClientSideToolRegistry();
  
  // Register all tools
  registry.registerTool(new CreateViewTool(callbacks.viewUpdateCallback));
  registry.registerTool(new CreatePageTool(callbacks.pageUpdateCallback));
  registry.registerTool(new UpdateViewTool(callbacks.viewUpdateByIdCallback));
  registry.registerTool(new UpdatePageTool(callbacks.pageUpdateByIdCallback));
  registry.registerTool(new DeleteViewTool(callbacks.viewDeleteCallback));
  registry.registerTool(new DeletePageTool(callbacks.pageDeleteCallback));
  registry.registerTool(new GetApplicationConfigTool(callbacks.getApplicationConfigCallback));
  registry.registerTool(new GetPageTool(callbacks.getPageCallback));
  registry.registerTool(new GetViewTool(callbacks.getViewCallback));
  
  return registry;
}

/**
 * Register client-side tools
 */
export function registerClientSideTools(registry: ClientSideToolRegistry): void {
  // This function can be used to register additional tools
  console.log('Registering client-side tools');
}
