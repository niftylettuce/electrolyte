var debug = require('debug')('electrolyte');


function Component(id, dependencies) {
  this.id = id;
  this.dependencies = dependencies;
}

Component.prototype.create = function(container) {
  debug('create %s', this.id);
  
  if (!this.loaded) {
    var deps = this.dependencies
      , args = [];
    for (var i = 0, len = deps.length; i < len; ++i) {
      var inst = container.create(deps[i], this);
      args.push(inst);
    }
  }
  return this.instantiate.apply(this, args);
}

Component.prototype.instantiate = function() {
  throw new Error("Unable to instantiate component '" + this.id + "'");
}

module.exports = Component;
