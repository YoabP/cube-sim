"use strict";
/**
 * Represents a "Center" piece.
 * This is considered the rotation axis in a puzzle.
 * Not every puzzle's center pieces are exactly
 * what one would call the "center" pieces.
 * @class
 * @extends {CUBES.Piece}
 */
CUBES.Center = class Center extends CUBES.Piece{
  /**
   * Creates a center object.
   * @param  {object} args - Object containing parameters.
   * @param  {CUBES.Socket[][]} args.sockets - Matrix of sockets affected by the center.
   * @param  {number} args.rotationStep - Amount of positions pieces are shifted by rotation.
   * @param  {number} args.depth - The amount of slices affected by this axis.
   * @param  {CUBES.Piece} args.piece - The piece for the center. TODO: integrate into center.
   */
  constructor(args) {
    super (args);
    args = args? args : {};
    /**
     * Matrix of sockets affected by this center's rotation.
     * The first index is for depth, 0 being outermost.
     * Pieces are ordered starting from top leftmost corner
     * and continuing clockwise.
     * @type {CUBES.Socket[][]}
     */
    this.sockets  = args.sockets? args.sockets : [];
    /**
     * Amount to shift pieces by each rotation. <br>
     * For example: A 3x3x3 would be 2, as there is an
     * edge between every corner, so a piece would move
     * two spaces in the array to get to its new position.
     * @type {number}
     */
    this.rotationStep  = args.rotationStep? args.rotationStep : 1;
    /**
     * The number of slices affected by this center. <br>
     * For example: a 3x3x3 would be 1, as each center
     * moves only the outermost face. A 4x4x4 would be 2
     * since the middle slices also follow the same center.
     * As a fun note, 5x5x5 would also have a depth of 2.
     * @type {number}
     */
    this.depth  = args.depth? args.depth : 1;

    /**
     * The piece occupying the center space.
     * TODO: integrate into center.
     * @type {CUBES.Piece}
     */
    this.piece  = args.piece? args.piece : null;
  }
  /**
   * Rotate the center. Shift pieces between sockets
   * by [rotationStep]{@linkcode CUBES.Center#rotationStep} amount.
   * This affects all sockets on the specified depth.
   * @param  {bool} CCW   - If rotation should be counter clockwise.
   * @param  {type} depth - Which slice to rotate.
   */
  rotate(CCW, depth){
    //ClockWise: shift 0->1
    //counterClokwise: shift 0<-1
    var startingPiece;
    for (var r = 0; r < this.rotationStep; r++) {
      if(CCW){
        startingPiece = this.sockets[depth][0].piece;
        for (var i = 0; i < this.sockets[depth].length-1; i++) {
          this.sockets[depth][i].piece = this.sockets[depth][i+1].piece;
        }
        this.sockets[depth][this.sockets[depth].length-1].piece = startingPiece;
      }
      else{
        startingPiece = this.sockets[depth][this.sockets[depth].length-1].piece;
        for (var i = this.sockets[depth].length-2; i >= 0; i--) {
          this.sockets[depth][i+1].piece = this.sockets[depth][i].piece;
        }
        this.sockets[depth][0].piece = startingPiece;
      }
    }
    this.piece.orientation.rotate(CCW);
  }
  /**
   * Print socket matrix for debugging purposes.
   */
  log(){
    var str = '[';
    var depth = this.sockets.length;
    for (var i = 0; i < depth; i++) {
      var len = this.sockets[i].length;
      str = '[';
      this.sockets[i].forEach(function(elem, index){
        str += elem.piece.cubie.name + (index == len-1?'':',');
      });
      str+=']';
    }
    str+=']';
    console.log(str);
  }
};
