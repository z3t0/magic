precision mediump float;
uniform sampler2D texture;

void main() {
  gl_FragColor = texture2D(texture, vec2(0.5, 0.5));  
}