var ndarray = require('ndarray')
var chunker = require('./chunker.js')

exports.chunkList = ndarray(new Array(16 * 16 * 16), [16, 16, 16])

exports.CreateChunks = function() {
  for (x = 0; x < 16; x++) {
    for (y = 0; y < 16; y++) {
      for (z = 0; z < 16; z++) { 
        this.chunkList.set(x, y, z, new chunker.CreateChunk())
      }
    }
  }

  console.log("Chunks made: ")
  console.log(this.chunkList)
}

exports.GetBlock = function(ax, ay, az) {
  // Find Block  0, 0, 0 in Chunk 0, 0, 0 : pass

  x = ax;
  y = ax;
  z = ax;

  var blockX = ax % 16
  var blockY = ay % 16
  var blockZ = az % 16

  var chunkX = 0
  var chunkY = 0
  var chunkZ = 0

  x = ax - blockX
  y = ay - blockY
  z = az - blockZ

  if(x > 16){
    while(x){
      chunkX += 1
      x -= 16
    }
  }

    if(y > 16){
    while(y){
      chunkY += 1
      y -= 16
    }
  }

    if(z > 16){
    while(z){
      chunkZ += 1
      z -= 16
    }
  }

  chunk = this.chunkList.get(chunkX, chunkY, chunkZ)
  return chunker.GetBlock(chunk, blockX, blockY, blockZ)
}

exports.SetBlock = function(ax, ay, az, block) {
  x = ax;
  y = ax;
  z = ax;

  var blockX = ax % 16
  var blockY = ay % 16
  var blockZ = az % 16

  var chunkX = 0
  var chunkY = 0
  var chunkZ = 0

  x = ax - blockX
  y = ay - blockY
  z = az - blockZ

  if(x > 16){
    while(x){
      chunkX += 1
      x -= 16
    }
  }

    if(y > 16){
    while(y){
      chunkY += 1
      y -= 16
    }
  }

    if(z > 16){
    while(z){
      chunkZ += 1
      z -= 16
    }
  }
  console.log(chunkX + " " + chunkY + " " + chunkZ)
  var chunk = this.chunkList.get(chunkX, chunkY, chunkZ)
  console.log(chunk)
  chunker.SetBlock(chunk, blockX, blockY, blockZ, block)
} 
