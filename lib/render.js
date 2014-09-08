var debug = require('debug')('list-ui:render');
var mercury = require('mercury');
var h = mercury.h;
var extend = require('xtend');
var stringify = require('node-stringify');

module.exports = function _List_render (state, events) {
  debug(state, events);

  var list = [];
  for (var i = 0; i < state.model.length; i++) {
    var item = state.model[i];
    if (typeof item !== 'undefined') {
      list.push(
        item && item.render && item.render(item) || stringify(item)
      );
    }
  }

  debug("rendering list", list);

  var config = state.config;
  var itemSize = config.itemSize;

  return h('div.list.ui', {
    style: state.style.ui,
  }, [
    state.config.debugToggle ? h('input.debug.toggle', {
      type: "checkbox",
      name: "debug",
      checked: state.config.debug,
      'ev-event': mercury.changeEvent(state.events.setDebug),
    }) : [],
    h('div.controls', {
      style: state.style.controls,
    }, state.config.debug ? [
    ] : []),
    h('ul.list', {
      style: state.style.list,
    }, list.map(function (item) {
      return h('li.item', {
        style: extend({
          width: itemSize.x && (itemSize.x + "px") || undefined,
          height: itemSize.y && (itemSize.y + "px") || undefined,
        }, state.style.item),
      }, item)
    }))
  ])
  ;
}
