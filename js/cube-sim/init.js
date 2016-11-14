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
Math.getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
CUBES.Vectors = {
  U: new THREE.Vector3(0,1,0),
  D: new THREE.Vector3(0,-1,0),
  R: new THREE.Vector3(1,0,0),
  L: new THREE.Vector3(-1,0,0),
  F: new THREE.Vector3(0,0,1),
  B: new THREE.Vector3(0,0,-1)
};
CUBES.vectorToFace = function vectorToFace(v){
  if (v.length()!= 1){return null;}
  if( v.x == 1)  {return "R";}
  if( v.x == -1) {return "L";}
  if( v.y == 1)  {return "U";}
  if( v.y == -1) {return "D";}
  if( v.z == 1)  {return "F";}
  if( v.z == -1) {return "B";}
}
