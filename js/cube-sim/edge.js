"use strict";
/**
 * Represents a piece that joins center pieces.
 * @class
 * @extends {CUBES.Piece}
 */
CUBES.Edge = class Edge extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientation.stateCount = 2;
  }
};
