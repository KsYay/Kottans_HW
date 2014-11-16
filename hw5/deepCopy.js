function deepCopy(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = {}; 
    for(var key in obj) {
        temp[key] = deepCopy(obj[key]); 
    }
    return temp;
}