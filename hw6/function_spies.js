function Spy(target, method) {
   var obj = {count: 0};
   var func = target[method];
   target[method] = function() {
   	obj.count++;
   	return func.apply(this, arguments);	
   }
   return obj;
}
    
module.exports = Spy;