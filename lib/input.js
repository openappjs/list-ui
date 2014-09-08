var debug = require('debug')('list-ui:input');
var mercury = require('mercury');
var extend = require('xtend');

module.exports = function _List_input (options, events, update) {

  events.setDebug(function (data) {
    update.setDebug(data.debug);
  });
};
