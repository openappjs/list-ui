var debug = require('debug')('list-ui:render');
var mercury = require('mercury');
var h = mercury.h;
var extend = require('xtend');
var stringify = require('node-stringify');

module.exports = function _List_render (state, events) {
  debug(state, events);

  var list = [];
  for (var i = 0; i < state.children.length; i++) {
    var child = state.children[i];
    if (typeof child !== 'undefined') {
      //TODO pass in state.style.item properties as  'parent' object to child datum
      list.push(
        child && child.render && child.render(child) || stringify(child)
      );
    }
  }

  debug("rendering list", list);

  console.log('list', state.style)

  var config = state.config;
  var itemSize = config.itemSize;

  return h('#list-ui.list.ui', {
    style: state.style.ui,
  }, [
    state.config.debugToggle ? h('input.debug.toggle', {
      style: state.style.debug,
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
