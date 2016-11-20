"use strict"
/**
 * A representation of 'space' that a piece occupies.
 * Puzzle's sockets don't move place, they represent
 * only the empty imaginary space where pieces are.
 * Oddly named.
 * @class
 */
CUBES.Socket = class Socket {
  /**
   * Create a socket object.
   * @param  {object} args - Object containing parameters.
   * @param  {CUBES.Piece} args.piece - Piece for the socket.
   */
   constructor(args) {
    args = args? args : {};

    /**
     * Piece currently in socket.
     * @type {CUBES.Piece}
     */
    this.piece  = args.piece? args.piece : null;
    /**
     * Piece that should be in socket.
     * The piece which was originally in this place.
     * @type {CUBES.Piece}
     */
    this.originalPiece = args.piece? args.piece : null;
  }

  /**
   * Sets a piece as this sockets current
   * and original piece. Meant to be used
   * if piece was not set during construction.
   * @param  {CUBES.Piece} piece - The piece to assign to the socket.
   */
  setPiece(piece){
    this.piece = piece;
    this.originalPiece = piece;
  }

  /**
   * Check if the current piece in the socket is in
   * the correct position.
   * @return {bool}  true if positioned, false otherwise.
   */
  isPositioned(){
    return this.piece === this.originalPiece;
  }

  /**
   * Check if the current piece in the socket
   * is oriented correctly.
   * @return {bool}  true if oriented, false otherwise;
   */
  isOriented(){
    return this.piece.isOriented();
  }
}
