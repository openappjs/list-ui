
module.exports = {
  person: {
    'position': 'relative',
    'display': 'block',
    'padding': '10px 15px',
    'margin-bottom': '-1px',
    'height': '50px',
    'cursor': 'pointer'
  },
  image: {
    'position': 'absolute',
    'display':'inline-block',
    'width': '40px',
    'height': '40px',
    'top': 0,
    'bottom': 0,
    'margin': 'auto'
  },
  properties: {
    'display': 'inline-block',
    'padding-left': '8px'
  },
  "prop-name": {
    'position': 'absolute',
    'display': 'inline-block',
    'top': 0 ,
    'bottom': 0,
    'margin': 'auto',
    'height': '20px',
    'left': '63px'
  },
  "prop-email": {
    display: 'none'
  },
  "prop-bio": {
    display: "none"
  },
  label: {
    'display': 'none'
  },
  input: function(readOnly) {
    return readOnly ? { border: 'none' } : {};
  },
  children: {
    'position': 'relative'
  }

}