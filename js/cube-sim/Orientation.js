//represents a puzzle piece orientation
"use strict";
CUBES.Orientation = new class Orientation {
  constructor(args) {
    args = args? args : {};
    this.state = args.state? args.state : 0;
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
}
