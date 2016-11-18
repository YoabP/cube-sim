//oddly named, it identifies the empty imaginary space that a piece occupies.
"use strict"
CUBES.Socket = class Socket {
  constructor(args) {
    args = args? args : {};
    this.piece  = args.piece? args.piece : null;
    this.originalPiece = args.piece? args.piece : null;
    this.visibleFaces  = args.visibleFaces? args.visibleFaces : null;
  }
  //TODO: define a method to get colors from set of visible faces.
  getColors(){
    if (this.piece == null || this.visibleFaces) return null;
  }
  //Sets the piece and assigns as the correct piece for socket.
  setPiece(piece){
    this.piece = piece;
    this.originalPiece = piece;
  }
  isPositioned(){
    return this.piece === this.originalPiece;
  }
}
