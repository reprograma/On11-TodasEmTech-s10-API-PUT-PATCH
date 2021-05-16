const validadeInputs = (obj , require) => {    
    let keys =  Object.keys(obj);
    let outObj = {};
    for (let key of keys) {
         let value = obj[key] || undefined;
        if (value==""  || !value) {
            if (require) return false;
        }
        else 
            outObj[key] = value;
    }
    if (Object.keys(outObj).length > 0) 
    return outObj;
    else
    return undefined;
}



 const oneFind = (arr , key, compare, lowerCase) => {    
    let findOut = arr.find(obj => {
            if (lowerCase)  {
             let str = compare.toLowerCase();
            return obj[key].toLowerCase().includes(str);
        } 
        else 
        return obj[key] == compare;
    })
    
    return findOut;
    
}

module.exports = {
    validadeInputs,
    oneFind
}

//  test
// console.log(oneFind([
//     {nome : "bia"}
// ],
//     "nome",
//     'bia',
//     false
// ))