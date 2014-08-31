var debug = require('debug')('list-ui');
var mercury = require('mercury');
var h = mercury.h;
var stringify = require('node-stringify');
var extend = require('xtend');

function List (options) {
  options = options || {};
  var style = options.style || {};
  var config = options.config || {};

  var events = mercury.input(["setDebug"]);

  // setup state
  var state = mercury.struct({
    model: mercury.array(options.model),
    style: mercury.struct({
      list: mercury.value(style.list || {}),
      controls: mercury.value(style.controls || {}),
      table: mercury.value(style.table || {}),
      row: mercury.value(style.row || {}),
      cell: mercury.value(style.cell || {}),
    }),
    config: mercury.struct({
      debug: mercury.value(options.config.debug || false),
      debugToggle: mercury.value(options.config.debugToggle || false),
      itemSize: mercury.struct({
        x: config.itemSize && config.itemSize.x || config.itemSize || undefined,
        y: config.itemSize && config.itemSize.y || config.itemSize || undefined,
      }),
    }),
    events: events,
    render: mercury.value(List.render),
  });

  // setup events
  events.setDebug(function (data) {
    state.config.debug.set(data.debug);
  });

  debug("setup", state);

  return { state: state, events: events };
}

List.render = function (state, events) {
  debug("render", state, events);

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

module.exports = List;
