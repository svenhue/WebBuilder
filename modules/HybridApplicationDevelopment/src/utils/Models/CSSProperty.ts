export class CSSProperty{
    name: string;
    value: string;
    constructor(c: CSSProperty){
        Object.assign(this, c);
    }
}