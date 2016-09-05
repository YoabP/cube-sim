//represents a center piece. They act as rotation axises
"use strict";
CUBES.Center = class Center {
  //TODO: Arrange sockets as an array of loops
  // TODO: Add Depth to centers. To allow for inner slices.
  // This will mean a matrix will represent centers.
  constructor(args) {
    args = args? args : {};
    this.sockets  = args.sockets? args.sockets : [];
    this.rotationStep  = args.rotationStep? args.rotationStep : 1;
    this.orientationCount  = args.orientationCount? args.orientationCount : 0;
    this.orientation  = args.orientation? args.orientation : 0;
    this.piece  = args.piece? args.piece : null;
  }
  rotate(CCW){
    //ClockWise: shift 0->1
    //counterClokwise: shift 0<-1
    var startingPiece;
    for (var r = 0; r < this.rotationStep; r++) {
      if(CCW){
        startingPiece = this.sockets[0].piece;
        for (var i = 0; i < this.sockets.length-1; i++) {
          this.sockets[i].piece = this.sockets[i+1].piece;
        }
        this.sockets[this.sockets.length-1].piece = startingPiece;
      }
      else{
        startingPiece = this.sockets[this.sockets.length-1].piece;
        for (var i = this.sockets.length-2; i >= 0; i--) {
          this.sockets[i+1].piece = this.sockets[i].piece;
        }
        this.sockets[0].piece = startingPiece;
      }
    }
  }
  log(){
    var str = '[';
    var len = this.sockets.length;
    this.sockets.forEach(function(elem, index){
      str += elem.piece + (index == len-1?'':',');
    });
    str+=']';
    console.log(str);
  }
};
