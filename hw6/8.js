function duckCount() {
	var args = Array.prototype.slice.call(arguments, 0);
    return args.reduce(function(num, item) {
	    num += Object.prototype.hasOwnProperty.call(item, 'quack');
	    return num;
	}, 0)
}

      // function duckCount() {
      //   return Array.prototype.slice.call(arguments).filter(function(obj) {
      //     return Object.prototype.hasOwnProperty.call(obj, 'quack')
      //   }).length;
      // }


    module.exports = duckCount
