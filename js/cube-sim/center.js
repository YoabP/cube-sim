//represents a center piece. They act as rotation axises
"use strict";
CUBES.Center = class Center {
  constructor(args) {
    args = args? args : {};
    this.sockets  = args.sockets? args.sockets : [];
    this.rotationStep  = args.rotationStep? args.rotationStep : 1;
    this.orientationCount  = args.orientationCount? args.orientationCount : 0;
    this.orientation  = args.orientation? args.orientation : 0;
    this.depth  = args.depth? args.depth : 1;
    this.piece  = args.piece? args.piece : null;
  }
  rotate(CCW, depth){
    //ClockWise: shift 0->1
    //counterClokwise: shift 0<-1
    var startingPiece;
    for (var r = 0; r < this.rotationStep; r++) {
      if(CCW){
        startingPiece = this.sockets[depth][0].piece;
        for (var i = 0; i < this.sockets[depth].length-1; i++) {
          this.sockets[depth][i].piece = this.sockets[depth][i+1].piece;
        }
        this.sockets[depth][this.sockets[depth].length-1].piece = startingPiece;
      }
      else{
        startingPiece = this.sockets[depth][this.sockets[depth].length-1].piece;
        for (var i = this.sockets[depth].length-2; i >= 0; i--) {
          this.sockets[depth][i+1].piece = this.sockets[depth][i].piece;
        }
        this.sockets[depth][0].piece = startingPiece;
      }
    }
  }
  log(){
    var str = '[';
    var depth = this.sockets.length;
    for (var i = 0; i < depth; i++) {
      var len = this.sockets[i].length;
      str = '[';
      this.sockets[i].forEach(function(elem, index){
        str += elem.piece + (index == len-1?'':',');
      });
      str+=']';
    }
    str+=']';
    console.log(str);
  }
};
