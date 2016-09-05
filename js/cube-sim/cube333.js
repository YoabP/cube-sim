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
      colors:[CUBES.Colors.W,CUBES.Colors.G]
    });
    this.sockets[2].piece = new CUBES.Corner({
      colors: [CUBES.Colors.W,CUBES.Colors.O,CUBES.Colors.B]
    });
    this.sockets[3].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.B]
    });
    this.sockets[4].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.B,CUBES.Colors.R]
    });
    this.sockets[5].piece =new CUBES.Edge({
      colors:[CUBES.Colors.W, CUBES.Colors.R]
    });
    this.sockets[6].piece =new CUBES.Edge({
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
    this.sockets[12].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.O, CUBES.Colors.G]
    });
    this.sockets[13].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.O]
    });
    this.sockets[14].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.B, CUBES.Colors.O]
    });
    this.sockets[15].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.B]
    });
    this.sockets[16].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.R,CUBES.Colors.B]
    });
    this.sockets[17].piece =new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.R]
    });
    this.sockets[18].piece =new CUBES.Edge({
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
};
