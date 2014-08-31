var mercury = require('mercury');

var List = require('../');

// include app styling
require('./app.css');

// include list-ui styling
require('../index.css');

// include item component and styling
var Item = require('./item');
require('./item.css');

var numItems = 16;

// setup colors
var colors = [];
for (var i = 0; i < numItems; i++) {
  var chan = (i / numItems) * 256;
  var chanHex = parseInt(chan, 10).toString(16);
  if (chanHex.length === 1) chanHex = '0' + chanHex;
  colors.push(chanHex + chanHex + chanHex);
}

// use colors to create list of item states
var items = [];
colors.forEach(function (color) {
  items.push(Item(color).state);
});

// create list-ui component
var list = List({
  model: items,
  style: {
    list: {
      backgroundColor: 'green',
    },
  },
  config: {
    debug: true,
    debugToggle: true,
    itemSize: {
      x: 80,
      y: 80,
    },
  },
});

// start app
mercury.app(document.body, list.state, List.render);
