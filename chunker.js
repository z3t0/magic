var ndarray = require('ndarray')
var block   = require('./block.js')
var vec3    = require('gl-vec3')

exports.Chunk = function() {
  var chunk = new Object()
  chunk.size = 16
  chunk.dims = [chunk.size, chunk.size, chunk.size]
  chunk.data = ndarray(new Array(chunk.dims[0] * chunk.dims[1] * chunk.dims[2]), chunk.dims)
  chunk.mesh = new Array()

  console.log(chunk.mesh)

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
  chunk.mesh.length = 0
  for (x = 0; x < chunk.size; x++) {
    for (y = 0; y < chunk.size; y++){
      for (z = 0; z < chunk.size; z++){
        if(this.GetBlock(chunk, x, y, z).id){
          CreateCubeMesh(chunk, x, y, z, 1)
        }
      }
    }
  }
}


function AddTriangleToMesh(mesh, v1, v2, v3){
  mesh.push(v1[0])
  mesh.push(v1[1])
  mesh.push(v1[2])

  mesh.push(v2[0])
  mesh.push(v2[1])
  mesh.push(v2[2])

  mesh.push(v3[0])
  mesh.push(v3[1])
  mesh.push(v3[2])
}

exports.CreateCubeMesh = function(chunk, x, y, z, size) {
  
  points = new Array(8)
  
  points[0] = [x - size, y - size, z + size]
  points[1] = [x + size, y - size, z + size]
  points[2] = [x + size, y + size, z + size]
  points[3] = [x - size, y + size, z + size]
  points[4] = [x + size, y - size, z - size]
  points[5] = [x - size, y - size, z - size]
  points[6] = [x - size, y + size, z - size]
  points[7] = [x + size, y + size, z - size]

  // Front
  AddTriangleToMesh(chunk.mesh, points[0], points[1], points[2])
  AddTriangleToMesh(chunk.mesh, points[0], points[2], points[3])

  // Back
  AddTriangleToMesh(chunk.mesh, points[4], points[5], points[6])
  AddTriangleToMesh(chunk.mesh, points[4], points[6], points[7])

  // Right
  AddTriangleToMesh(chunk.mesh, points[1], points[4], points[7])
  AddTriangleToMesh(chunk.mesh, points[1], points[7], points[2])

  // Left
  AddTriangleToMesh(chunk.mesh, points[5], points[0], points[3])
  AddTriangleToMesh(chunk.mesh, points[5], points[3], points[6])

  // Top
  AddTriangleToMesh(chunk.mesh, points[3], points[2], points[7])
  AddTriangleToMesh(chunk.mesh, points[3], points[7], points[6])

  // Bottom
  AddTriangleToMesh(chunk.mesh, points[5], points[4], points[1])
  AddTriangleToMesh(chunk.mesh, points[5], points[1], points[0])

}

exports.GetBlock = function(chunk, x, y, z) {
  return chunk.data.get(x,y,z)
}

exports.SetBlock = function(chunk, x, y, z, block) {
  chunk.data.set(x, y, z, block)
}