//initial file for cube-sim js files
//
/**
 * Cube-sim namespace.
 * @namespace CUBES
 */
var CUBES = {};
/**
 * Hex values for common colors.
 * @type {Object.<string, number>}
 */
CUBES.Colors = {
  R: 0xff0000,
  O: 0xff8000,
  G: 0x00ff00,
  B: 0x0000ff,
  W: 0xffffff,
  Y: 0xffff00,
  Bk: 0x333333
};
/**
 * Math is a built-in object that has properties
 * and methods for mathematical constants and functions.
 * Not a function object.
 * @external Math
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */

/**
 * Transforms radians to degrees.
 * @function external:Math.toDegrees
 * @param  {number} angle Angle in radians.
 * @return {number} Angle in degrees.
 */
Math.toDegrees = function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
/**
 * Transforms degrees to radians.
 * @function external:Math.toRadians
 * @param  {number} angle Angle in degrees.
 * @return {number} Angle in radians.
 */
 Math.toRadians = function toRadians (angle) {
  return angle * (Math.PI / 180);
}
/**
 * Generates a random int number in an inclusive range.
 * @function external:Math.toRadians
 * @param  {number} min - Minimal possible number.
 * @param  {number} max - Maximum possible number.
 * @return {number} Generated Integer.
 */
Math.getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Vector representation for cube faces.
 * @type {Object.<string, THREE.Vector3>}
 */
CUBES.Vectors = {
  U: new THREE.Vector3(0,1,0),
  D: new THREE.Vector3(0,-1,0),
  R: new THREE.Vector3(1,0,0),
  L: new THREE.Vector3(-1,0,0),
  F: new THREE.Vector3(0,0,1),
  B: new THREE.Vector3(0,0,-1)
};
/**
 * Gives a face, given a vector.
 * @param  {Vector3} v - Unitary vector representing face.
 * @return {string}   The face (R,L,U,D,F,B) represented.
 */
CUBES.vectorToFace = function vectorToFace(v){
  if (v.length()!= 1){return null;}
  if( v.x == 1)  {return "R";}
  if( v.x == -1) {return "L";}
  if( v.y == 1)  {return "U";}
  if( v.y == -1) {return "D";}
  if( v.z == 1)  {return "F";}
  if( v.z == -1) {return "B";}
}

// Rotate an object around an axis in object space
CUBES.rotateAroundObjectAxis = function rotateAroundObjectAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.setRotationAxis( axis.normalize(), radians );
    object.matrix.multiplySelf( rotationMatrix );                       // post-multiply
    object.rotation.setRotationFromMatrix( object.matrix );
}

// Rotate an object around an axis in world space (the axis passes through the object's position)
CUBES.rotateAroundWorldAxis = function rotateAroundWorldAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    rotationMatrix.multiply( object.matrix );                       // pre-multiply
    object.matrix = rotationMatrix;
    object.rotation.setRotationFromMatrix( object.matrix );
}
