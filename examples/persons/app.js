var mercury = require('mercury');

var List = require('../../');
var PersonUI = require('person-ui');
var Icon = require('font-icon-ui');
var yaml = require('yaml-js');
var fs = require('fs');
var insertCss = require('insert-css');
var cfs = require('css-face-string');
var domready = require('domready');


//pull data
var people = [
  fs.readFileSync('./examples/persons/craftodex-data/people/mikey.yml', {encoding: 'utf8'}),
  fs.readFileSync('./examples/persons/craftodex-data/people/simon.yml', {encoding: 'utf8'})
]

people = people.map(function(p) {
  return yaml.load(p);
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

people = people.map(function(p) {
  p.id = p["@id"];
  delete p["@id"];
  return {
    model: p,
    children: [icon],
    styleController: require('./styles'),
    view: 'list-item'
  }
})


people = people.map(function(p) {
  return PersonUI(p).state;
})

var list = List({
  children: people,
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
