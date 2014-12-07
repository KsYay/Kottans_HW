    function getShortMessages(messages) {
    	var filtered = messages.filter(function(obj) {
    		if(obj.message.length<50) 
    			return obj;
    	});
    	var result = filtered.map(function(obj) {
    		return obj.message;
    	});
    	return result;
    }
    
    module.exports = getShortMessages;
