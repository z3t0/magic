var chunker = require('./chunker.js')
var textureLoader = require('./texture.js')

var server = require('./server.js')

exports.texture = null

exports.CreateBlock = function(id){
    var block = new Object()
    block.id = id

    switch (id) {
        case 0: // Air
            break

        case 1: // Stone
            block.texture = [0,0]
            break

        case 2: // Grass
            block.texture = [0,1]
            break

        default:
            console.log("This block does not exist?")
            break
    }

    return block
}

exports.LoadTextures = function() {

    textureLoader.LoadTexture('./textures/atlas.jpg', this.texture)
}

exports.Direction = {
    north: 1,
    east: 2,
    south: 3,
    west: 4,
    up: 5,
    down: 6
}

exports.SaveTexture = function(data, texture) {
    this.texture = data
    console.log("Texture Loaded: ")
    console.log(this.texture)
    server.emit('loadedTextures')
}

exports.IsSolid = function(chunk, x, y, z, direction) {
    block = chunker.GetBlock(chunk, x, y, z) // 1 -1 0
    if(block === undefined) {
        return false;
    }
    else if (block.id !== 1){
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