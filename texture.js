var events = require('events')
var server = require('./server.js')
var block = require('./block.js')

// TOOD: more efficient system for other textures too, look at an atlast next.
//       only have to bind texture once, after that I simply have to specify coordinates for textures, hence I will
//       mainly be dealng with coordinates in the code

exports.LoadTexture = function(path) {
  var texture;

  var getPixels = require('get-pixels') 

  getPixels(path, function(err, data) {
    if(err) {
      console.log("Bad image path")
      return
    }

    block.SaveTexture(data);
  })
}