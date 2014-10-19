var mercury = require('mercury');

var List = require('../../');
var PersonUI = require('person-ui');
var Icon = require('font-icon-ui');
var yaml = require('yaml-js');
var fs = require('fs');
var insertCss = require('insert-css');
var cfs = require('css-face-string');
var domready = require('domready');
var Aviator = require('aviator');
var _ = require('lodash');

var data;

//pull data
var files = [
  fs.readFileSync('./examples/persons/craftodex-data/people/mikey.yml', {encoding: 'utf8'}),
  fs.readFileSync('./examples/persons/craftodex-data/people/simon.yml', {encoding: 'utf8'})
];

data = files.map(function(p) {
  var obj = yaml.load(p);
  obj.id = obj['@id']
  delete obj['@id'];
  return obj
});


//insert styles and fonts
var fontAwesome = cfs.file({
  name: 'icons',
  files: [
    {url: './persons/fonts/fontawesome-webfont.eot', format: 'eot'},
    {url: './persons/fonts/fontawesome-webfont.svg', format: 'svg'},
    {url: './persons/fonts/fontawesome-webfont.ttf', format: 'ttf'},
    {url: './persons/fonts/fontawesome-webfont.woff', format: 'woff'},
  ]
});
insertCss(fontAwesome);
var css1 = fs.readFileSync('./index.css');
var css2 = fs.readFileSync('./examples/persons/index.css');
insertCss(css1);
insertCss(css2);

//bootstrap child component
var icon = Icon({
  model: {
    iconName: 'icon-arrow-right',
    screenReaderText: 'profile link',
    unicode: "\\f105",
    fontFamily: 'icons'
  },
  style: {
    icon: {
      position: 'absolute',
      'font-size': '32px',
      'font-weight': 'bold',
      top: '-14px',
      right: '0px',
      color: '#777777'      
    }
  }
}).state;

// define simple routing 
PersonTarget = {
  profile: function (req) {
    console.log(req)
    var id = req.params.id

    var person = _.find(data, function(d){ return d.id.indexOf(id) >= 0 });
    console.log('person', person)
    if (person) {
      var profile = {
        model: person,
        commands: [],
        styleController: require('./styles'),
        view: 'profile'
      };

      console.log('profile', profile);

      var personUi = PersonUI(profile)
      var elems = document.getElementsByClassName('ui');
      if (elems.length > 0) {
        for (var i=0;i<elems.length;i++) {
          var elem = elems.item(i);
          elem.remove();
        }
      }

      mercury.app(document.body, personUi.state, PersonUI.render)



    }

  },
  ui: function (req) {
    if (req.params.id) return;

    var elems = document.getElementsByClassName('ui');
    if (elems.length > 0) {
      for (var i=0;i<elems.length;i++) {
        var elem = elems.item(i);
        elem.remove();
      }
    }
    console.log('ui', req, list);

    //rerender list
    if (list) {
      mercury.app(document.body, list.state, List.render);
    }

  }

}


Aviator.pushStateEnabled = true;
Aviator.root = "/persons"
Aviator.setRoutes({
  '/*': {
    target: PersonTarget,
    '/*': 'ui',
    '/:id': {
      '/*': 'profile'
    }
    }
});

Aviator.dispatch();

function click (options) {
  console.log('list-item clicked', options)
  var id = '/' + options.id.split('/').slice(-1)[0];
  Aviator.navigate(id)
}



personUis = data.map(function(p) {
  return {
    model: p,
    children: [icon],
    commands: {
      click: click
    },
    styleController: require('./styles'),
    view: 'list-item'
  }
})

personUis = personUis.map(function(p) {
  return PersonUI(p).state;
})

var list = List({
  children: personUis,
  style: {
    ui: {
      width: '100%'
    },
    list: {
      'list-style-type': 'none'
    },
    debug: {
      display: 'none'
    },
    controls: {
      display: 'none'
    }
  },
  config: {
    debug: true,
    debugToggle: true,
    itemSize: {
      x: undefined,
      y: undefined,
    },
  },
});

domready(function() {

  //render app on body, trigger re-render on state change
  mercury.app(document.body, list.state, List.render);



})
