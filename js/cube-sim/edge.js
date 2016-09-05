//Represents a piece that joins center pieces
"use strict";
CUBES.Edge = class Edge extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientationCount = 2;
  }
  //switch the current orientation for the only other option.
  orientationToggle(){
    this.orientation = this.orientation == 0? 1 : 0;
  }
};
