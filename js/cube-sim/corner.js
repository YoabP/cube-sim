//represents a piece that intersects 3 edges
"use strict";
CUBES.Corner = class Corner extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientation.stateCount = 3;
  }
};
