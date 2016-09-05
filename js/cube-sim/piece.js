//represents a puzzle piece
"use strict";
CUBES.Piece = class Piece {
  constructor(args) {
    args = args? args : {};
    this.colors  = args.colors? args.colors : [];
    this.orientationCount = args.orientationCount? args.orientationCount : 0;
    this.orientation  = args.orientation? args.orientation : 0;
  }
};
