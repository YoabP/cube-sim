//represents a piece that intersects 3 edges
"use strict";
CUBES.Corner = class Corner extends CUBES.Piece {
  constructor(args) {
    super(args);
    this.orientationCount = 3;
  }
  orientationRotate(CCW){
    if(CCW){
      this.orientation = this.orientation - 1;
      this.orientation = this.orientation == -1? 2 : this.orientation;
    }
    else{
      this.orientation = (this.orientation + 1)%3;
    }
  }
};
