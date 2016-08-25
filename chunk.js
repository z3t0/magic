var ndarray = require('ndarray')
var block = require('./block.js')

module.exports = function() {
    return new Chunk()
}

function Chunk() {
    this.size = 16
    this.dims = [this.size, this.size, this.size]
    this.data = ndarray(new Array(this.dims[0] * this.dims[1] * this.dims[2]), this.dims)
    this.mesh = null

    // TODO: Add position

    // Set all blocks
    for (x = 0; x < this.size; x++) {
        for (y = 0; y < this.size; y++){
            for (z = 0; z < this.size; z++){
                this.data.set(x,y,z, new block(x, y, z, 1))
            }
        }
    }
}

Chunk.prototype.CreateMesh = function(chunk) {
    var mesh = []

    for (x = 0; x < this.size; x++) {
        for (y = 0; y < this.size; y++){
            for (z = 0; z < this.size; z++){
                var mesh = mesh.concat(this.data.get(x, y, z).CreateMesh())
            }
        }
    }

    this.mesh = mesh
    debugger;
}

Chunk.prototype.GetBlock = function(x, y, z) {
    return this.data.get(x,y,z)
}