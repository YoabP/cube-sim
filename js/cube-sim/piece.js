//represents a puzzle piece
"use strict";
CUBES.Piece = class Piece {
  constructor(args) {
    args = args? args : {};
    this.colors  = args.colors? args.colors : [];
    this.orientation = new CUBES.Orientation({
      state : args.orientation? args.orientation : 0,
      stateCount : args.orientationCount? args.orientationCount : 0,
      ignore: args.ignoreOrientation
    });
  }
};
