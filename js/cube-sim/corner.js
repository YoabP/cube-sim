"use strict";
/**
 * represents a piece that intersects 3 edges.
 * @class
 * @extends {CUBES.Piece}
 */
CUBES.Corner = class Corner extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientation.stateCount = 3;
  }
};
