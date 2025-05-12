import { IPageConfiguration } from "alphautils"

enum WebsiteTypes{
    personalBlog = "personalBlog",
    companyWebsite = "companyWebsite",
    portfolioWebsite = "portfolioWebsite",
    blog = "blog",
    landingpage = "landingpage"
}


interface WebsiteScopeDefinition{
    pages: Array<IPageConfiguration>
    timelineToBuildWebsite: {
        workHours: number,
        endDate: string // iso string
    }

}

interface IColorPalette{
  primary: string;
  secondary: string;
  accent?: string;
  positive?: string;
  negative?: string;
  warning?: string;
  info?: string;
  dark?: string;
  light?: string;
  gray?: {
    light: string;
    medium: string;
    dark: string;
  };
  text?: {
    primary: string;
    muted?: string;
    inverse?: string;
  };
}
interface IFontDefinition {
  fontFamily: string;          // e.g. "Inter", "Roboto", "Open Sans"
  fontWeight?: number | string; // e.g. 400, 500, "bold"
  fontSize?: string;           // e.g. "16px", "1rem"
  lineHeight?: string;         // e.g. "1.5", "24px"
  letterSpacing?: string;      // e.g. "0.5px"
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

interface IWebsiteTypography {
  baseFont: IFontDefinition; // default for body text
  headings: {
    h1: IFontDefinition;
    h2: IFontDefinition;
    h3: IFontDefinition;
    h4?: IFontDefinition;
    h5?: IFontDefinition;
    h6?: IFontDefinition;
  };
  buttons?: IFontDefinition;
  inputs?: IFontDefinition;
  captions?: IFontDefinition;
  monospace?: IFontDefinition; // for code blocks or technical content
  fallbackFonts?: string[]; // e.g. ["Helvetica", "Arial", "sans-serif"]
  fontScale?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // optional abstract scaling
  responsive?: boolean; // whether font sizes adapt on viewport
  prefersSerif?: boolean; // preference flag for serif/sans-serif logic
}


interface IBrandVoice {
  tone: 'professional' | 'friendly' | 'playful' | 'bold' | 'luxurious' | 'minimal' | 'inspirational' | string;
  personalityTraits?: string[]; // e.g. ['confident', 'helpful', 'funny']
  targetAudience?: string;      // e.g. "young professionals", "tech startups"
  writingStyle?: 'formal' | 'conversational' | 'technical' | 'persuasive' | string;
  emojiUsage?: 'none' | 'minimal' | 'frequent';
  contractions?: boolean;       // "do not" vs. "don't"
  useOfJargon?: 'none' | 'light' | 'heavy'; // for tech/finance/legal contexts
  taglineStyle?: 'short & punchy' | 'descriptive' | 'none';
  preferredVocabulary?: string[];   // e.g. ["innovative", "scalable", "human"]
  avoidVocabulary?: string[];      // e.g. ["cheap", "fast", "disrupt"]
}



interface IWebsiteBrandStyle{
    logoUrl: string
    colorPalette: IColorPalette
    typography: IWebsiteTypography
    brandVoice: IBrandVoice
}
// todo sitemap
interface WebsiteCreationRequirementsObject{

    websiteType: WebsiteTypes
    goalsOfTheWebsite: Array<{
        title: string
        description: string
        kpis?: Array<string>
    }>
    targetAudience: string
    companyDetails: string
    additionalContext: string
    scope: WebsiteScopeDefinition
    designStyle: IWebsiteBrandStyle
}

export {
    type WebsiteCreationRequirementsObject,
    IBrandVoice,
    IColorPalette,
    IFontDefinition,
    IWebsiteTypography,
    IWebsiteBrandStyle
}