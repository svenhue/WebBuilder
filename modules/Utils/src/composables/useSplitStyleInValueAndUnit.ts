export function Split(v) {
    if (typeof v === 'string' && v != ''){
        const split = v.match(/^([-.\d]+(?:\.\d+)?)(.*)$/);
        if(split == null){
            return { 'value':v, 'unit':"" }
        }
        return {'value':split[1].trim(),  'unit':split[2].trim()};
    }
    else{
        return { 'value':v, 'unit':"" }
    }
}