ndarray = require('ndarray')

function Chunk () {
  var chunk;
  chunk.size = 16
  chunk.dims = [this.size, this.size, this.size]
  chunk.data = ndarray(new Uint16Array(dims[0] * dims[1] * dims[2]), dims)

  return chunk
}

var chunk = new Chunk();

for (x = 0; x < chunk.size; x++) {
  for (y = 0; y < chunk.size; y++){
    for (z = 0; z < chunk.size; z++){
      chunk.data.set(x,y,z, 1)
  }
}

console.log("Finished Chunk Building")


for (x = 0; x < chunk.size; x++) {
  for (y = 0; y < chunk.size; y++){
    for (z = 0; z < chunk.size; z++){
      console.log(chunk.data.get(x,y,z))
  }
}