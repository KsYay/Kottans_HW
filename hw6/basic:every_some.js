    function checkUsersValid(goodUsers) {
        return function(submittedUsers) {
        	return submittedUsers.every(function(obj1) {
        		return goodUsers.some(function(obj2) {
        			return obj1.id == obj2.id;
        		});
        	});
        };
    }
    
    module.exports = checkUsersValid
