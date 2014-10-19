var debug = require('debug')('list-ui:state');
var mercury = require('mercury');
var extend = require('xtend');

module.exports = function _List_state (options, events) {
  console.log('options', options)

  var style = options.style || {};
  var config = options.config || {};

  return mercury.struct({
    children: mercury.array(options.children),
    style: mercury.struct({
      ui: mercury.value(style.ui || {}),
      list: mercury.value(style.list || {}),
      controls: mercury.value(style.controls || {}),
      table: mercury.value(style.table || {}),
      row: mercury.value(style.row || {}),
      cell: mercury.value(style.cell || {}),
      debug: mercury.value(style.debug || {})
    }),
    config: mercury.struct({
      debug: mercury.value(config.debug || false),
      debugToggle: mercury.value(config.debugToggle || false),
      itemSize: mercury.struct({
        x: config.itemSize && config.itemSize.x || config.itemSize || undefined,
        y: config.itemSize && config.itemSize.y || config.itemSize || undefined,
      }),
    }),
    events: events,
    render: mercury.value(require('./render')),
  });
}
