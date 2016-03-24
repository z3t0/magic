
precision mediump float;
uniform sampler2D texture;
uniform vec2 texCoord;

void main() {
  float zoom = 16.0 / 32.0;
  gl_FragColor = texture2D(texture, fract(vec2(32, 32)) * zoom + vec2(0, 1));
}
