import { type IAgent, BaseAgent, IChatEntry, IChatHistory, IFrontLineAgent, ILLMApi } from "agenticBusinessIntegration";
import { IAgentSkill } from "agenticBusinessIntegration/src/Agents/IAgentSkill";
import { ClaudeApi } from "agenticBusinessIntegration/src/LLM/ClaudeApi";

export class WebsiteCreationAgent extends BaseAgent implements IFrontLineAgent{

    name: string = "WebsiteAgent";
    _avaibleAgents: IAgent[];
    _llm: ILLMApi;
    _context: IChatHistory
    description: string = `
    You are an expert in designing and building high-quality websites for startups, freelancers, and organizations. You are particularly skilled in using a pro-code platform called WebBuilder.

    Your job is to collaborate step-by-step with the user to collect all necessary information and construct a valid "WebsiteCreationRequirementsObject" in JSON format.

    💡 Be helpful and proactive: the user can answer your questions, but **does not have to**. If the user skips or is unsure, you must provide a **sensible recommendation** they can accept or modify.

    At the end of each step, always output the full object using this exact format:

    :Object:WebsiteCreationRequirementsObject  
    ... JSON here ...  
    :Object::End

    ---

    Here are the **6 steps** to complete the website setup. For each step:

    - Ask clear, targeted questions  
    - If the user does not answer fully, offer a smart suggestion  
    - Always ask: “Do you want to use this, or change it?”

    ---

    **Step 1: Initial Conversation**  
    Welcome the user and ask what kind of website they want to create and who it is for. Identify early ideas for:
    - "websiteType" (e.g. portfolio, blog, company website, etc.)
    - "targetAudience" (e.g. tech buyers, local customers, Gen Z)
    - "companyDetails" (what the site represents)
    - "additionalContext" (anything that may influence the site)  

    If the user is unsure, suggest something based on keywords or a common use case.

    ---

    **Step 2: Goals of the Website**  
    Ask what the website should achieve (e.g. lead generation, reputation, recruiting, education).  
    If no answer is given, suggest 1–2 realistic goals with example KPIs.  
    Ask: *“Would you like to use this goal setup, or change something?”*  
    Then fill the "goalsOfTheWebsite" array.

    ---

    **Step 3: Website Scope and Timeline**  
    Ask how many pages they need and which pages they want (e.g. Home, About, Contact).  
    Ask for time expectations: how many hours they plan to invest and until when the site should be launched.  
    If unsure, suggest a typical setup (e.g. 3–5 pages, launch in 2 weeks).  
    Ask: *“Shall we go with this plan, or adjust anything?”*  
    Fill the "scope" object.

    ---

    **Step 4: Visual & Brand Style**  
    Ask if they have branding (logo, colors, font preferences). If not:
    - Suggest a color palette (primary, secondary, neutral)
    - Suggest a matching typography set (headings + base font)
    - Optionally generate a moodboard-style description

    Then show your proposed "colorPalette" and "typography", and ask:  
    *“Does this style fit your brand, or should we try something else?”*

    Fill the "designStyle.colorPalette" and "typography".

    ---

    **Step 5: Brand Voice**  
    Ask how the site should sound: tone (e.g. friendly, professional), style (formal vs. casual), use of emojis, use of contractions, etc.  
    If the user doesn’t know, suggest a tone+style combo based on the business type or audience. Also suggest example vocabulary to use or avoid.  
    Ask: *“Do you want to go with this tone and language style?”*

    Then fill the "brandVoice" object.

    ---

    **Step 6: Final Review & Confirmation**  
    Show the full "WebsiteCreationRequirementsObject". Ask the user:
    - “Is this ready to move forward?”
    - “Would you like to change or add anything?”
    Once confirmed, the object can be used to generate the actual website.

    ---

    Begin now with Step 1.

    `

    createWebsitePrompt = `
    After you gathered all requirements, create the final website json configuration:

    This is the type for it:

    interface IApplicationConfiguration{
            
        id: number;
        name: string;
        rootComponent?: IViewConfiguration;
        mode?: ApplicationModes
        //selector?: string;
        modules?: Array<IApplicationModule>
        pages?: Array<IPageConfiguration>
        stylesheets?: IApplicationStyleSheets
        globalVariables?: IGlobalApplicationVariables
        internationalization: IInternationalization

    interface IViewConfiguration extends IBOInstance {

        id: number;
        contextid: number;
        publicidentifier?: string;
        isRoutable?: boolean;
        route: IRouteDefinition,
        type: string
        appName?: string; // todo remove this
        template?: string;
        isRoot?: boolean;
        icon?: string;
        imagePath?: string;
        tag: string;
        content?: object;
        requiresAuth:{
            auth: boolean,
            redirect?: string
        }
        properties: {
            imageSrc: string
            iconName: string
            showIf: string
        }
        isActive?: boolean;
        position?: number // position in the rendering process
        interaction?: IViewInteraction;
        htmlattributes?: object;
        class: Array<string>
        style?: object;
        role?: ViewRoles
        parentId?: number
        children? : Array<IViewConfiguration>

        //remove this
        value: Array<IViewConfiguration>
        templateIdentifier?: string; // todo remove this
    }`

    skills: IAgentSkill[] = [
        {
            name: "CreatePage",
            description: "Create a new page in the website",
            
        },
        {
            name: "AddComponent",
            description: "Add a component to the page",
        }
    ]
    tools = [
        {
            name: "CreatePage",
            description: "Create a new page in the website",
        }
    ]
 
    constructor(
        availableAgents: IAgent[]
    )
    {
        super()
        this._llm = new ClaudeApi(this.description);
        this._avaibleAgents = availableAgents
        this._context = {
            entries:[]
        }
    }

    public async getAnswerAsync(message: string): Promise<string> {
        if(message == "Init website creation conversation"){
            this._context.entries.push({
                id: new Date().toTimeString(),
                content: this.description,
                role: 'user',
                timestamp: new Date()
            })
        }
        const answer = await this._llm.getChatMessageAsync(this.getMessages(message))
        return answer;
    }

    getMessages(
            newMessage: string): Array<IChatEntry> {
            this._context.entries.push({
                id: new Date().toTimeString(),
                role: 'user',
                content:newMessage,
                timestamp: new Date()
            });

            return this._context.entries.map((e) => {
                return e
            })
        }
    
    
}