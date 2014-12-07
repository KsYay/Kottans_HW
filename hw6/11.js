 	module.exports = function arrayMap(arr, fn) {
    	return arr.reduce(function(newArr, item, index, arr) {
    		return newArr.concat(fn(item, index, arr));
    	}, []);
    }
