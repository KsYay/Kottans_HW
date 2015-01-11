function loadUsers(userIds, load, done) {
      var users = [];
      var completed = 0;
      
      userIds.forEach(function(el, i) {
        load(el, function(user) {
        	users[i] = user;
        	if (++completed === userIds.length) return done(users);
        });
      }); 
};
    
module.exports = loadUsers;
