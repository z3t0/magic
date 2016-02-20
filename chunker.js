var ndarray = require('ndarray')
var block = require('./block.js')

exports.Chunk = function() {
  var chunk = new Object()
  chunk.size = 16
  chunk.dims = [chunk.size, chunk.size, chunk.size]
  chunk.data = ndarray(new Array(chunk.dims[0] * chunk.dims[1] * chunk.dims[2]), chunk.dims)
  chunk.mesh = null

  // Set all blocks
  for (x = 0; x < chunk.size; x++) {
    for (y = 0; y < chunk.size; y++){
      for (z = 0; z < chunk.size; z++){
        chunk.data.set(x,y,z, new block.CreateBlock(1))
      }
    }
  }

  console.log("Created Chunk")
  return chunk
}

exports.CreateMesh = function(chunk) {

}

exports.GetBlock = function(chunk, x, y, z) {
  return chunk.data.get(x,y,z)
}