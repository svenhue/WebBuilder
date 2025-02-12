import { CSSBorderStyleValues } from "../utils/Enums/CSSBorderStyleValues";
import { CSSFontWeights } from "../utils/Enums/CSSFontWeights";
import { CSSFonts } from "../utils/Enums/CSSFonts";
import { CSSObjectFits } from "../utils/Enums/CSSObjectFits";
import { CSSPositionValues } from "../utils/Enums/CSSPositionValues";
import { CSSSizeUnits } from "../utils/Enums/CSSSizeUnits";

export class StyleManagerViewModel{
    
    sizeUnits = Array<string>();
    objectFits = Array<string>();
    positionValues = Array<string>();
    fonts = Array<string>();
    fontWeights = Array<string>();
    borderStyles = Array<string>();

    constructor(){
        this.fonts = Object.values(CSSFonts);
        this.fontWeights = Object.values(CSSFontWeights);
        this.borderStyles = Object.values(CSSBorderStyleValues);
        this.sizeUnits = Object.values(CSSSizeUnits);
        this.objectFits = Object.values(CSSObjectFits);
        this.positionValues = Object.values(CSSPositionValues);

    }

    getViewBackgrounds(){
        return '';
    }
}