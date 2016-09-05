//Common 3x3x3 cubic puzzle
"use strict";

CUBES.Cube333 = class Cube333 {
  //Description:
  // Face turning, cube puzzle
  // 6 centers, affecting 9 pieces each
  // Center colors:
  //     [1B]
  // [2L][0U][3R]
  //     [4F]
  //     [5D]
  // Center piece structure:
  // [0][1][2]
  // [7][c][3]
  // [6][5][4]
  //
  // Socket 3D space. C indicates a center.
  // Top layer     Middle layer      Bottom Layer
  // [0][1][2]     [ 8][ c][ 9]     [12][13][14]
  // [7][c][3]     [ c][  ][ c]     [19][ c][15]
  // [6][5][4]     [11][ c][10]     [18][17][16]
  constructor() {
    this.centers = {};
    this.sockets = [];
    //Build the puzzle 'space' with sockets.
    for (var i = 0; i < 20; i++) {
      this.sockets[i] = new CUBES.Socket({piece:i});
    }
    // UP White face.
    this.centers['U'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.W]}),
      sockets: [this.sockets[0],this.sockets[1],this.sockets[2],
                this.sockets[3],this.sockets[4],this.sockets[5],
                this.sockets[6],this.sockets[7]]
    });
    //FRONT Red face.
    this.centers['F'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.R]}),
      sockets: [this.sockets[6],this.sockets[5],this.sockets[4],
                this.sockets[10],this.sockets[16],this.sockets[17],
                this.sockets[18],this.sockets[11]]
    });
    //RIGHT Blue face
    this.centers['R'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.B]}),
      sockets: [this.sockets[4],this.sockets[3],this.sockets[2],
                this.sockets[9],this.sockets[14],this.sockets[15],
                this.sockets[16],this.sockets[10]]
    });
    //LEFT Green face
    this.centers['L'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.B]}),
      sockets: [this.sockets[0],this.sockets[7],this.sockets[6],
                this.sockets[11],this.sockets[18],this.sockets[19],
                this.sockets[12],this.sockets[8]]
    });
    //BACK Orange face
    this.centers['B'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.O]}),
      sockets: [this.sockets[2],this.sockets[1],this.sockets[0],
                this.sockets[8],this.sockets[12],this.sockets[13],
                this.sockets[14],this.sockets[9]]
    });
    //DOWN Yellow face
    this.centers['D'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.Y]}),
      sockets: [this.sockets[18],this.sockets[17],this.sockets[16],
                this.sockets[15],this.sockets[14],this.sockets[13],
                this.sockets[12],this.sockets[19]]
    });
    //Assign pieces to sockets
    //Top layer
    this.sockets[0].piece = new CUBES.Corner({
      colors:[CUBES.Colors.W, CUBES.Colors.G, CUBES.Colors.O]
    });
    this.sockets[1].piece = new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.O]
    });
    this.sockets[2].piece = new CUBES.Corner({
      colors: [CUBES.Colors.W,CUBES.Colors.O,CUBES.Colors.B]
    });
    this.sockets[3].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.B]
    });
    this.sockets[4].piece =new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.B,CUBES.Colors.R]
    });
    this.sockets[5].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W, CUBES.Colors.R]
    });
    this.sockets[6].piece =new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.R,CUBES.Colors.G]
    });
    this.sockets[7].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.G]
    });
    //Back face pointing either back or front for edges that are not
    // on U|D, this applies only to the edges on the middle layer 8-11
    this.sockets[8].piece =new CUBES.Edge({
      colors:[CUBES.Colors.O,CUBES.Colors.G]
    });
    this.sockets[9].piece =new CUBES.Edge({
      colors:[CUBES.Colors.O, CUBES.Colors.B]
    });
    this.sockets[10].piece =new CUBES.Edge({
      colors:[CUBES.Colors.R, CUBES.Colors.B]
    });
    this.sockets[11].piece =new CUBES.Edge({
      colors:[CUBES.Colors.R, CUBES.Colors.G]
    });
    this.sockets[12].piece =new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.O, CUBES.Colors.G]
    });
    this.sockets[13].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.O]
    });
    this.sockets[14].piece =new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.B, CUBES.Colors.O]
    });
    this.sockets[15].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.B]
    });
    this.sockets[16].piece =new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.R,CUBES.Colors.B]
    });
    this.sockets[17].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.R]
    });
    this.sockets[18].piece =new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.G,CUBES.Colors.R]
    });
    this.sockets[19].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.G]
    });
  }

  //Rotate a slice in the cube, will rotate pieces and adjust orientations.
  // A move with a * indicates it is counter ClockWise
  // Notes on orientation:
  // Corner Pieces: Orientation indicates the index of the color currently
  //    facing top or down, depending on what socket they are.
  // Edge Pieces: Orientation indicates the index of the color facing
  //    top or down if they are on the U|D slices
  //    front or back if they are on the middle slice.
  rotate(move){
    switch (move) {
      //U&D moves change no orientation.
      case 'U':
      case 'U*':
        this.centers['U'].rotate(move === 'U*');
        break;
      case 'D':
      case 'D*':
        this.centers['D'].rotate(move === 'D*');
        break;
      //F&B moves change all pieces orientation
      case 'F':
      case 'F*':
        this.centers['F'].rotate(move === 'F*');
        this.centers['F'].sockets.forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientationRotate(CCW);
          }
          else{//Orient Edges
            currentPiece.orientationToggle();
          }
        });
        break;
      case 'B':
      case 'B*':
        this.centers['B'].rotate(move === 'B*');
        this.centers['B'].sockets.forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientationRotate(CCW);
          }
          else{//Orient Edges
            currentPiece.orientationToggle();
          }
        });
        break;
      //R&L moves don't change edge orientation.
      case 'R':
      case 'R*':
        this.centers['R'].rotate(move === 'R*');
        this.centers['R'].sockets.forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientationRotate(CCW);
          }
        });
        break;
      case 'L':
      case 'L*':
        this.centers['L'].rotate(move === 'L*');
        this.centers['L'].sockets.forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientationRotate(CCW);
          }
        });
        break;
    }
  }
  //Builds a cube made of the pieces in the cube.
  // TODO: make it animation ready. May need to change to a more loosee
  //  logic - visualization scheme. For now this will serve for logic testing
  //  as the renderer will follow logical model exactly.
  initRenderer(){
      var cols = {
        F: CUBES.Colors.R,
        B: CUBES.Colors.O,
        L: CUBES.Colors.G,
        R: CUBES.Colors.B,
        U: CUBES.Colors.W,
        D: CUBES.Colors.Y
      }
      var sz = 1;
      this.object3D = new THREE.Object3D();
      //create cubies
      for (var i = 0; i < this.sockets.length; i++) {
        this.sockets[i].cubie = new CUBES.ColoredCube(sz);
        this.sockets[i].cubie.setColors(cols);
        this.object3D.add(this.sockets[i].cubie.object3D);
      }
      for (var center in this.centers) {
        if (this.centers.hasOwnProperty(center)) {
            this.centers[center].cubie = new CUBES.ColoredCube(sz);
            this.centers[center].cubie.setColors(cols);
            this.object3D.add(this.centers[center].cubie.object3D);
        }
      }
      this._positionSocketCubies(sz );
      this._positionCenterCubies(sz);
  }
  _positionSocketCubies(size){
    for (var y = 0; y < 3; y++) {
      for (var z = 0; z < 3; z++) {
        for (var x = 0; x < 3; x++) {
          var i = CUBES.Cube333.pieceSocketMap[y][z][x];
          if(i == 'c' || i == null) continue;
           var cubie = this.sockets[i].cubie.object3D;
           cubie.position.x = size*x -size;
           cubie.position.y = size*y -size;
           cubie.position.z = size*z -size;
        }
      }
    }
  }
  _positionCenterCubies(size){
    this.centers['U'].cubie.object3D.position.y = size;
    this.centers['D'].cubie.object3D.position.y = -size;

    this.centers['R'].cubie.object3D.position.x = size;
    this.centers['L'].cubie.object3D.position.x = -size;

    this.centers['F'].cubie.object3D.position.z = size;
    this.centers['B'].cubie.object3D.position.z = -size;
  }

  updateRenderer(){
    //Check model and recolor pieces accordingly
    this._recolorSocketCubies()
  }
  _recolorSocketCubies(){
    for (var y = 0; y < 3; y++) {
      for (var z = 0; z < 3; z++) {
        for (var x = 0; x < 3; x++) {
          var i = CUBES.Cube333.pieceSocketMap[y][z][x];
          if(i == 'c' || i == null) continue;
           var cubie = this.sockets[i].cubie;
           cubie.clearColors();
           var piece = this.sockets[i].piece;
           var cols = {};
           switch(y){
             case 2: //Top Layer
               cols.U = piece.colors[piece.orientation];
               if (piece instanceof CUBES.Edge){
                var otherIndx = (piece.orientation + 1)%piece.orientationCount;
                 if(z == 0) cols.B = piece.colors[otherIndx];
                 if(z == 2) cols.F = piece.colors[otherIndx];
                 if(x == 0) cols.L = piece.colors[otherIndx];
                 if(x == 2) cols.R = piece.colors[otherIndx];
               }
               else{ //corners
                 var CWIndx  = piece.orientationRotatePeek();
                 var CCWIndx = piece.orientationRotatePeek(true);
                 if(z == x) {
                   cols.F = cols.B = piece.colors[CCWIndx];
                   cols.R = cols.L = piece.colors[CWIndx];
                 }
                 else{
                   cols.F = cols.B = piece.colors[CWIndx];
                   cols.R = cols.L = piece.colors[CCWIndx];
                 }
               }
               break;
             case 1: //Middle, all ar edges
                var otherIndx = (piece.orientation + 1)%piece.orientationCount;
                if(z == 2){
                  cols.F = piece.colors[piece.orientation];
                }
                else{
                  cols.B = piece.colors[piece.orientation];
                }
                if(x == 0) cols.L = piece.colors[otherIndx];
                if(x == 2) cols.R = piece.colors[otherIndx];
               break;
             case 0: //Bottom
               cols.D = piece.colors[piece.orientation];
               if (piece instanceof CUBES.Edge){
                var otherIndx = (piece.orientation + 1)%piece.orientationCount;
                 if(z == 0) cols.B = piece.colors[otherIndx];
                 if(z == 2) cols.F = piece.colors[otherIndx];
                 if(x == 0) cols.L = piece.colors[otherIndx];
                 if(x == 2) cols.R = piece.colors[otherIndx];
               }
               else{ //corners
                 var CWIndx  = piece.orientationRotatePeek();
                 var CCWIndx = piece.orientationRotatePeek(true);
                 if(z != x) {
                   cols.F = cols.B = piece.colors[CCWIndx];
                   cols.R = cols.L = piece.colors[CWIndx];
                 }
                 else{
                   cols.F = cols.B = piece.colors[CWIndx];
                   cols.R = cols.L = piece.colors[CCWIndx];
                 }
               }
               break;
           }
           cubie.setColors(cols);
        }
      }
    }
  }
};

//static vars
CUBES.Cube333.pieceSocketMap = [];
// Top layer     Middle layer      Bottom Layer
// [0][1][2]     [ 8][ c][ 9]     [12][13][14]
// [7][c][3]     [ c][  ][ c]     [19][ c][15]
// [6][5][4]     [11][ c][10]     [18][17][16]
CUBES.Cube333.pieceSocketMap[2] = [[0,1,2],
                     [7,'c',3],
                     [6,5,4]];
CUBES.Cube333.pieceSocketMap[1] = [[ 8,'c', 9],
                    ['c', null,'c'],
                    [11,'c',10]];
CUBES.Cube333.pieceSocketMap[0] = [[12,13,14],
                    [19,'c',15],
                    [18,17,16]];
