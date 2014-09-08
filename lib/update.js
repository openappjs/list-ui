var debug = require('debug')('list-ui:update');
var mercury = require('mercury');
var extend = require('xtend');

module.exports = function _List_update (options, state) {
  return {
    setDebug: function (value) {
      debug("setDebug", value);
      state.config.debug.set(value);
    },
  };
};
