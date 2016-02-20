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
console.log(chunk.data)

// Shader Program
var shader = glShader(gl,
  glslify('./shader.vert'),
  glslify('./shader.frag')
)

// Matrices
var triangleMatrix   = mat4.create()
var squareMatrix     = mat4.create()
var projectionMatrix = mat4.create()

// Vertices
var triangle = glBuffer(gl, new Float32Array([
  +0.0, +1.0, +0.0,
  -1.0, -1.0, +0.0,
  +1.0, -1.0, +0.0
]))

var square = glBuffer(gl, new Float32Array([
  +1.0, +1.0, +0.0,
  -1.0, +1.0, +0.0,
  +1.0, -1.0, +0.0,
  -1.0, -1.0, +0.0
]))

triangle.length = 3 // number of vertices
square.length = 4 // number of vertixes 

shell.on("render", function() {

  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // Clear the screen and set the viewport before
  // drawing anything
  clear(gl)
  gl.viewport(0, 0, width, height)

  // clear(width, height)
  
  // Calculate projection matrix
  mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)
  // Calculate triangle's modelView matrix
  mat4.identity(triangleMatrix, triangleMatrix)
  mat4.translate(triangleMatrix, triangleMatrix, [-1.5, 0, -7])
  // Calculate squares's modelView matrix
  mat4.copy(squareMatrix, triangleMatrix)
  mat4.translate(squareMatrix, squareMatrix, [3, 0, 0])

  // Bind the shader
  shader.bind()
  shader.uniforms.uProjection = projectionMatrix

  // Draw the triangle
  triangle.bind()
  shader.attributes.aPosition.pointer()
  shader.uniforms.uModelView = triangleMatrix
  gl.drawArrays(gl.TRIANGLES, 0, triangle.length)

  // Draw the square
  square.bind()
  shader.attributes.aPosition.pointer()
  shader.uniforms.uModelView = squareMatrix
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

})
  

// Resize the canvas to fit the screen
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)