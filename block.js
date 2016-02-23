var chunker = require('./chunker.js')
var textureLoader = require('./texture.js')

var server = require('./server.js')

// TODO: Resource Loading
var stoneTexture;

textureLoader.LoadTexture('./textures/stone.jpg')

exports.CreateBlock = function(id){
  var block = new Object()
  block.id = id
  // console.log(stoneTexture)
  if(typeof stoneTexture !=='undefined')
      block.texture = stoneTexture
  
  else   {
    console.error("Stone Texture was not defined")
    console.log(stoneTexture)
  }

  return block 
}

exports.Direction = {
  north: 1,
  east: 2,
  south: 3,
  west: 4,
  up: 5,
  down: 6
}

exports.SaveTexture = function(data) {
  console.log("Texture being saved")
  stoneTexture = data;
  console.log(stoneTexture)
  server.emit('loadedTextures')
}
exports.IsSolid = function(chunk, x, y, z, direction) {
  block = chunker.GetBlock(chunk, x, y, z) // 1 -1 0
  if(block === undefined) {
    return false;
  }
  else if (block.id != 1){
    return false;
  }

  switch(direction) {
    case this.Direction.north:
      return true
      break;
    case this.Direction.east:
      return true
      break;
    case this.Direction.south:
      return true
      break;
    case this.Direction.west:
      return true
      break;
    case this.Direction.up:
      return true
      break;
    case this.Direction.down:
      return true
      break;
  }

  return false
}