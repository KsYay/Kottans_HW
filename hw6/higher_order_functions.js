var repeat = function( operation, num) {
	for(var i=0; i<num; i++)
		operation();
}

var operation = function() {
	return 5;
}

module.exports = repeat
