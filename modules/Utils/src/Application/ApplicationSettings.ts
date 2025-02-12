export class ApplicationSettings{

    value: object = {};

    public GetParameter(key: string, obj = this.value){
       
        
        if(obj.hasOwnProperty(key)) {
            return obj[key];
        }
        for(const i in obj) {
            if(typeof obj[i] === 'object'){
                const result = this.GetParameter(key, obj[i]);
                if(result){
                    return result;
                }
            }
        }
    }
}