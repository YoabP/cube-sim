//represents a puzzle piece orientation
"use strict";
CUBES.Orientation = class Orientation {
  constructor(args) {
    args = args? args : {};
    this.state = args.state? args.state : 0;
    this.originalState = args.state? args.state : 0;
    this.stateCount = args.stateCount? args.stateCount : 1;
  }
  set(state){
    this.state = state;
  }
  //Change between orientation states.
  // Works only for two state orientation.
  toggle(){
    if (this.stateCount != 2) throw "Can't toggle. stateCount: "+stateCount;
    this.state+=1;
    this.state%=2;
  }
  rotate(CCW){
    var offset = CCW? -1 : 1;
    this.state += offset;
    if (this.state < 0 )
      this.state = this.stateCount - 1;
    else {
      this.state%= this.stateCount;
    }
  }
  rotatePeek(CCW){
    var prevOrientation = this.state;
    this.rotate(CCW);
    var newOrientation = this.state;
    this.state = prevOrientation;
    return newOrientation;
  }
  isOriented(){
    return this.originalState === this.state;
  }
}
