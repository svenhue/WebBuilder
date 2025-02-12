export function deepcopy(target, source, targetpriors) {
  let newObj = {};
  
  for(let key in target) {
    newObj[key] = target[key];
  }
  for(let key in source) {
    if(Array.isArray(source[key])) {
      newObj[key] = source[key];
    }
    else if(typeof source[key] === 'object' && source[key] !== null) {
      newObj[key] = deepcopy(target[key] || {}, source[key], targetpriors);
    }else if(target[key] === undefined){
      newObj[key] = source[key];
    }else{
      newObj[key] = target[key];
    }
  }
  return newObj;
}

