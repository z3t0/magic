// Browserify
var canvas   = document.body.appendChild(document.createElement('canvas'))
var clear    = require('gl-clear')({ color: [0, 0, 0, 1] })
var gl       = require('gl-context')(canvas)
var glBuffer = require('gl-buffer')
var mat4     = require('gl-mat4')
var glShader = require('gl-shader')
var glslify  = require('glslify')
var shell    = require('game-shell')()
var ndarray = require('ndarray')
var createChunk  = require('./chunk.js')
var block    = require('./block.js')

// Shader Program
var shader = glShader(gl,
    glslify('./shader.vert'),
    glslify('./shader.frag')
)

// Matrices
var projectionMatrix = mat4.create()
var chunkMatrix = mat4.create()

// Chunk
var chunk = new createChunk()
chunk.CreateMesh()

// Vertices
var mesh = glBuffer(gl, chunk.mesh)

mesh.length = 16 * 16 * 16 * 6 * 2 * 3

var xRot = 0;
var yRot = 0;

shell.on("render", function() {

    var width = gl.drawingBufferWidth
    var height = gl.drawingBufferHeight

    // Clear the screen and set the viewport before
    // drawing anything
    clear(gl)
    gl.viewport(0, 0, width, height)

    // Calculate projection matrix
    mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)

    mat4.identity(chunkMatrix, chunkMatrix)

    // Bind the shader
    shader.bind()
    shader.uniforms.uProjection = projectionMatrix

    // draw the cube
    mesh.bind()
    shader.attributes.aPosition.pointer()
    shader.uniforms.uModelView = chunkMatrix
    gl.drawArrays(gl.TRIANGLES, 0, mesh.length)
})

// Resize the canvas to fit the screen
window.addEventListener('resize'
    , require('canvas-fit')(canvas)
    , false
)