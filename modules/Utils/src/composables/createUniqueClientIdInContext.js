export function createUniqueClientIdInContext(context) {
    let id = 0;
    const ids = context.map((item) => item);
    if(ids.length == 0) {
        id = 0;
    }else {
        id = Math.max(...ids) + 1;
    }
    return id;
}