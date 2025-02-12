import { injectable } from "inversify";
import { useIdentityStore } from "src/stores/useIdentityStore";

@injectable()
export class IdentityService{
    

    private store: ReturnType<typeof useIdentityStore>

    constructor(){
        this.store = useIdentityStore();
    }

    
}