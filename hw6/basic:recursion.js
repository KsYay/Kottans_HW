    function reduce(arr, fn, initial) {
    	if(!arr[0]) return initial;
    	initial[arr[0]] = (initial[arr[0]]+1) || 1;
        var tail = arr.slice(1);
        return reduce(tail, fn, initial);
    }
    
    module.exports = reduce


      // function reduce(arr, fn, initial) {
      //   return (function reduceOne(index, value) {
      //     if (index > arr.length - 1) return value // end condition
      //     return reduceOne(index + 1, fn(value, arr[index], index, arr)) // calculate & pass values to next step
      //   })(0, initial) // IIFE. kick off recursion with initial values
      // }

