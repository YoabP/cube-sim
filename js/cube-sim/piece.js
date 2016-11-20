"use strict";
/**
 * Represents a puzzle piece.
 * @class
 */
CUBES.Piece = class Piece {
  /**
   * Create a Piece.
   * Recieves an args object. Default values are used if any is missing.
   * @param {object} args - Object containing parameters.
   * @param {number[]} args.colors - Array of color hex values.
   * @param {number} args.orientation - Initial orientation state.
   * @param {number} args.orientationCount - Number of possible orientations.
   * @param {bool} args.ignoreOrientation - If piece should ignore orientation.
   */
  constructor(args) {
    args = args? args : {};
    /**
     * Array of hex values for this piece's colors.
     * @type {number[]}
     */
    this.colors  = args.colors? args.colors : [];
    /**
     * Orientation object of this piece.
     * @type {CUBES.Orientation}
     */
    this.orientation = new CUBES.Orientation({
      state : args.orientation? args.orientation : 0,
      stateCount : args.orientationCount? args.orientationCount : 0,
      ignore: args.ignoreOrientation
    });
  /**
   * Object3D representing this piece.
   * @type {THREE.Object3D}
   */
   this.cubie;
  }

  /**
   * Checks if piece is in correct orientation.
   * @return {bool}  true if oriented, false otherwise.
   */
  isOriented(){
    return this.orientation.isOriented();
  }
};
