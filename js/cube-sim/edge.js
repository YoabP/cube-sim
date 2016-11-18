//Represents a piece that joins center pieces
"use strict";
CUBES.Edge = class Edge extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientation.stateCount = 2;
  }
};
