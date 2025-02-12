  function searchObjectInNestedArray(objArr, nested, propName, propValue, options?: {array: boolean}) {
    const propValues = Array.isArray(propValue) ? propValue : [propValue]; // Convert propValue to an array if it's not already one
    let results = [];
    for (let i = 0; i < objArr?.length; i++) {
      const obj = objArr[i];
  
      // If the object has the desired property with one of the desired values, add it to the results array
      if (propValues.includes(obj[propName])) {
        results.push(obj);
      }
  
      // If the object has a nested array, recursively search that array for matching objects
      if (Array.isArray(obj[nested])) {
        const nestedResults = searchObjectInNestedArray(obj[nested], nested, propName, propValues);
        if(nestedResults != null){
          results = results.concat(nestedResults);
        }
      }
    }
    // If there are no results, return null; otherwise, return either the single matching object or the array of matching objects
    if (results.length === 0) {
      return null;
    } else if (results.length === 1 && options?.array != true){
      return results[0];
    } else {
      return results;
    }
  }

export { searchObjectInNestedArray }