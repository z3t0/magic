// Browserify
var canvas   = document.body.appendChild(document.createElement('canvas'))
var clear    = require('gl-clear')({ color: [0, 0, 0, 1] })
var gl       = require('gl-context')(canvas)
var glBuffer = require('gl-buffer')
var mat4     = require('gl-mat4')
var glShader = require('gl-shader')
var glslify  = require('glslify')
var shell    = require('game-shell')()
var path     = require('path')
var events    = require('events')
var ndarray  = require('ndarray')
var chunker  = require('./chunker.js')
var block    = require('./block.js')
var createTexture = require('gl-texture2d')
var textureLoader = require('./texture.js')
var server = require('./server.js')

server.on('loadedTextures', function () {
  enginestatus.ResourcesLoaded = true;
  console.log("ResourcesLoaded")
  server.emit('ready')
})

enginestatus = {
  ResourcesLoaded: false,
}

var chunk
var shader
var vboMatrix
var projectionMatrix
var vbo
var texture

server.on('ready', function() {

  // Create Chunk
  chunk = new chunker.Chunk()
  for (x = 0; x < chunk.size; x++){
    for (y = 0; y < chunk.size; y++){
      for (z = 0; z < chunk.size; z++){
          chunker.SetBlock(chunk, x, y, z, new block.CreateBlock(1))
      }
    }
  }

  chunker.SetBlock(chunk, 0, 0, 0, new block.CreateBlock(1))

  // Create Shader Program
  shader = glShader(gl,
  glslify('./shader.vert'),
  glslify('./shader2.frag')
  )

  // Matrices
  vboMatrix = mat4.create()
  projectionMatrix = mat4.create()

  vbo = glBuffer(gl, new Float32Array(chunk.mesh))
  vbo.length = chunk.mesh.length / 3

  texture = createTexture(gl, chunker.GetBlock(chunk, 0, 0, 0).texture)
  shader.uniforms.texture = texture.bind()


})

// Render function
shell.on("render", function() {
  if(enginestatus.ResourcesLoaded){

    if(chunk.remesh){
      console.log("remeshing")
      chunker.CreateMesh(chunk)
      vbo = glBuffer(gl, new Float32Array(chunk.mesh))
      vbo.length = chunk.mesh.length / 3

    }
  
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

    // Draw the cube
    vbo.bind()
    shader.attributes.aPosition.pointer()
    shader.uniforms.uModelView = vboMatrix
    gl.drawArrays(gl.TRIANGLES, 0, vbo.length)
  }
    
})
  

// Resize the canvas to fit the screen
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)