//initial file for cube-sim js files
var CUBES = {};
CUBES.Colors = {
  R: 0xff0000,
  O: 0xff8000,
  G: 0x00ff00,
  B: 0x0000ff,
  W: 0xffffff,
  Y: 0xffff00,
  Bk: 0x333333
};
Math.toDegrees = function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
Math.toRadians = function toRadians (angle) {
  return angle * (Math.PI / 180);
}
