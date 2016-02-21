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
var chunker  = require('./chunker.js')
var block    = require('./block.js')


chunk = new chunker.Chunk()
chunker.CreateCubeMesh(chunk, 0, 0, 0, 1)

// Shader Program
var shader = glShader(gl,
  glslify('./shader.vert'),
  glslify('./shader.frag')
)

// Matrices
var cubeMatrix = mat4.create()
var triangleMatrix   = mat4.create()
var squareMatrix     = mat4.create()
var projectionMatrix = mat4.create()

// Vertices
cube = glBuffer(gl, new Float32Array(chunk.mesh))

cube.length = 36

var b = 0

shell.on("render", function() {
  b += 0.05
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // Clear the screen and set the viewport before
  // drawing anything
  clear(gl)
  gl.viewport(0, 0, width, height)

  // Calculate projection matrix
  mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)

  // Calculate cube's modelView matrix
  mat4.identity(cubeMatrix, cubeMatrix)
  mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -10])
  mat4.rotateX(cubeMatrix, cubeMatrix, b)

  // Bind the shader
  shader.bind()
  shader.uniforms.uProjection = projectionMatrix

  // Draw the cube
  cube.bind()
  shader.attributes.aPosition.pointer()
  shader.uniforms.uModelView = cubeMatrix
  gl.drawArrays(gl.TRIANGLES, 0, cube.length)
})
  

// Resize the canvas to fit the screen
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)