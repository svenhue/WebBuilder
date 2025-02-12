//@ts-ignore
import { injectable } from 'inversify'
import { IBOInstance } from '../Data/IBOInstance.js'

@injectable()
export class BOService{

    boIds: Array<number>

    constructor(){
        this.boIds = []
    }

    NewId(bo: IBOInstance){
        const id = this.boIds.length > 0 ? Math.max(...this.boIds) + 1 : 1
        this.boIds.push(id)
        bo.id = id
        return bo;
    }
}