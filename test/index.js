var test = require('tape');
var mercury = require('mercury');
var raf = require('raf');
var event = require('synthetic-dom-events');
var document = require('global/document');
var stringify = require('node-stringify');

var List = require('../');

// if we are in a browser
if (process.browser) {
  // include example app styles
  require('../example/app.css');

  // include list-ui styles
  require('../index.css');
}

function end (t, el, elRm) {
  // cleanup
  elRm();
  document.body.removeChild(el);
  t.end();
}

test("creating a list of random content", function (t) {
  // setup
  var items = [
    0,[],"",{},null,undefined,
  ];
  var list = List({
    model: items,
    config: {
      itemSize: {
        x: 80,
        y: 80,
      },
    },
  });

  // start app
  var elRm = mercury.app(document.body, list.state, List.render);

  // after render
  raf(function () {
    var el = document.getElementsByClassName('list ui')[0];

    var controls = el.childNodes[0];
    t.ok(controls);
    t.equal(controls.className, "controls");
    var list = el.childNodes[1];
    t.ok(list);
    t.equal(list.className, "list");

    for (var i = 0; i < list.childNodes.length; i++) {
      var itemContainer = list.childNodes[i];
      t.equal(itemContainer.className, "item");
      t.equal(itemContainer.style.height, "80px");
      t.equal(itemContainer.style.width, "80px");
      t.equal(itemContainer.childNodes.length, 1);
      var item = itemContainer.childNodes[0];
      t.equal(
        item.textContent || item.data,
        stringify(items[i])
      );
    }

    end(t, el, elRm);
  });
});
