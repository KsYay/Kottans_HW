function getDependencies(tree, result) {
  result = result || [];
  var dependencies = tree.dependencies || [];
  Object.keys(dependencies).forEach(function(dep) {
    var key = dep + '@' + tree.dependencies[dep].version;
    if (result.indexOf(key) === -1) result.push(key);
    getDependencies(tree.dependencies[dep], result);
  })
  return result.sort();
}

module.exports = getDependencies;