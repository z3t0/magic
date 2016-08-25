module.exports = function(x, y, z, id) {
    return new Block(x, y, z, id)
}

function Block(x, y, z, id) {
    this.id = id
    this.x = x
    this.y = y
    this.z = z
}

Block.prototype.CreateMesh = function() {
    var mesh = []

    var x = this.x
    var y = this.y
    var z = this.z

    // Front
    mesh.push.apply(mesh, [
        x+1.0, y+1.0, z+1.0,
        x+1.0, y-1.0, z+1.0,
        x-1.0, y-1.0, z+1.0,

        x-1.0, y-1.0, z+1.0,
        x+1.0, y+1.0, z+1.0,
        x-1.0, y+1.0, z+1.0,
    ])

    // Back
    mesh.push.apply(mesh, [
        x+1.0, y+1.0, z-1.0,
        x+1.0, y-1.0, z-1.0,
        x-1.0, y-1.0, z-1.0,

        x-1.0, y-1.0, z-1.0,
        x-1.0, y+1.0, z-1.0,
        x+1.0, y+1.0, z-1.0,
    ])

    // Left
    mesh.push.apply(mesh, [
        x-1.0, y+1.0, z+1.0,
        x-1.0, y-1.0, z+1.0,
        x-1.0, y-1.0, z-1.0,

        x-1.0, y-1.0, z-1.0,
        x-1.0, y+1.0, z-1.0,
        x-1.0, y+1.0, z+1.0,
    ])

    // Right
    mesh.push.apply(mesh, [
        x+1.0, y+1.0, z+1.0,
        x+1.0, y-1.0, z+1.0,
        x+1.0, y-1.0, z-1.0,

        x+1.0, y-1.0, z-1.0,
        x+1.0, y+1.0, z-1.0,
        x+1.0, y+1.0, z+1.0,
    ])

    // Top
    mesh.push.apply(mesh, [
        x+1.0, y+1.0, z-1.0,
        x+1.0, y+1.0, z+1.0,
        x-1.0, y+1.0, z+1.0,

        x-1.0, y+1.0, z+1.0,
        x-1.0, y+1.0, z-1.0,
        x+1.0, y+1.0, z-1.0,
    ])

    // Bottom
    mesh.push.apply(mesh, [
        x+1.0, y-1.0, z-1.0,
        x+1.0, y-1.0, z+1.0,
        x-1.0, y-1.0, z+1.0,

        x-1.0, y-1.0, z+1.0,
        x-1.0, y-1.0, z-1.0,
        x+1.0, y-1.0, z-1.0,
    ])

    return mesh
}