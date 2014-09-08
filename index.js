var debug = require('debug')('list-ui');
var mercury = require('mercury');
var extend = require('xtend');

function List (options) {
  options = options || {};

  var events = mercury.input(["setDebug"]);
  var state = require('./lib/state')(options, events);
  var update = require('./lib/update')(options, state);
  require('./lib/input')(options, events, update);

  debug("setup", state());

  return { state: state, events: events };
}

List.render = require('./lib/render');

module.exports = List;
