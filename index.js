// Browserify require modules
var canvas   = document.body.appendChild(document.createElement('canvas'))
var clear    = require('gl-clear')({ color: [0, 0, 0, 1] })
var glBuffer = require('gl-buffer')
var mat4     = require('gl-mat4')
var glShader = require('gl-shader')
var glslify  = require('glslify')
var path     = require('path')
var events    = require('events')
var ndarray  = require('ndarray')
var gl       = require('gl-context')(canvas, render);

var chunker  = require('./chunker.js')
var block    = require('./block.js')
var createTexture = require('gl-texture2d')
var textureLoader = require('./texture.js')
var server = require('./server.js')
var chunk_manager = require('./chunk_manager.js')
//=====================================================
// TODO: figure out a better way to handle the render loop call

chunk_manager.CreateChunks();

server.on('loadedTextures', function () {
    server.emit('ready')
})

enginestatus = {
    ready: false,
}

var chunk
var shader
var vboMatrix
var projectionMatrix
var vbo
var texture

server.on('ready', function() {

    chunk_manager.SetBlock(0, 0, 0, new block.CreateBlock(1))
    chunk_manager.CreateMesh()
    chunk_manager.AddToMesh(chunk_manager.chunkList.get(0, 0, 0).mesh)

    console.log(block.stoneTexture)

    // Create Shader Program
    shader = glShader(gl,
    glslify('./shader.vert'),
    glslify('./shader2.frag')
    )

    // Matrices
    vboMatrix = mat4.create()
    projectionMatrix = mat4.create()

    vbo = glBuffer(gl, new Float32Array(chunk_manager.mesh))
    vbo.length = chunk_manager.mesh.length / 3

    texture = createTexture(gl, block.stoneTexture)
    shader.uniforms.texture = texture.bind()

    enginestatus.ready = true;
    console.log(chunk_manager)
    console.log("Engine is ready!")
    console.log("===========================================")
})

// Render function
function render() {
    if(enginestatus.ready){

        var width = gl.drawingBufferWidth
        var height = gl.drawingBufferHeight

        // Clear the screen and set the viewport before
        // drawing anything
        clear(gl)
        gl.viewport(0, 0, width, height)

        // Calculate projection matrix
        mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)

        // Calculate cube's modelView matrix
        mat4.identity(vboMatrix, vboMatrix)
        mat4.translate(vboMatrix, vboMatrix, [0, 0, -50])

        // Bind the shader
        shader.bind()
        shader.uniforms.uProjection = projectionMatrix

        // Draw the mesh
        vbo.bind()
        shader.attributes.aPosition.pointer()
        shader.uniforms.uModelView = vboMatrix
        gl.drawArrays(gl.TRIANGLES, 0, vbo.length)
    }

}

// Resize the canvas to fit the screen
window.addEventListener('resize'
            , require('canvas-fit')(canvas)
            , false
                       )