"use strict";
/**
 * Logical model for a 3x3x3 puzzle.<br>
 * <pre>
 * Face turning, cube puzzle
 * 6 centers, affecting 9 pieces each
 * Center faces:
 *     [1B]
 * [2L][0U][3R]
 *     [4F]
 *     [5D]
 * Center piece structure:
 * [0][1][2]
 * [7][c][3]
 * [6][5][4]
 *
 * Socket 3D space. C indicates a center.
 * Top layer     Middle layer      Bottom Layer
 * [0][1][2]     [ 8][ c][ 9]     [12][13][14]
 * [7][c][3]     [ c][  ][ c]     [19][ c][15]
 * [6][5][4]     [11][ c][10]     [18][17][16]
 *
 * Corner Pieces: Orientation indicates the index of the color currently
 *    facing top or down, depending on what socket they are.
 * Edge Pieces: Orientation indicates the index of the color facing
 *    top or down if they are on the U|D slices
 *    front or back if they are on the middle slice.
 * </pre>
 * @class
 * @namespace
 */
CUBES.Cube333 = class Cube333 {
  /**
   * Creates Cube33 object.
   */
  constructor() {
    /**
     * Center pieces for each face (R,L,U,D,F,B).
     * @type {Object.<string, CUBES.Center>}
     */
    this.centers = {};
    /**
     * Array of sockets in this puzzle.
     * @type {CUBES.Socket[]}
     */
    this.sockets = [];
    //Build the puzzle 'space' with sockets.
    for (var i = 0; i < 20; i++) {
      this.sockets[i] = new CUBES.Socket({piece:i});
    }
    // UP White face.
    this.centers['U'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.W], ignoreOrientation: true}),
      sockets: [[this.sockets[0],this.sockets[1],this.sockets[2],
                this.sockets[3],this.sockets[4],this.sockets[5],
                this.sockets[6],this.sockets[7]]]
    });
    //FRONT Red face.
    this.centers['F'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.R], ignoreOrientation: true}),
      sockets: [[this.sockets[6],this.sockets[5],this.sockets[4],
                this.sockets[10],this.sockets[16],this.sockets[17],
                this.sockets[18],this.sockets[11]]]
    });
    //RIGHT Blue face
    this.centers['R'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.B], ignoreOrientation: true}),
      sockets: [[this.sockets[4],this.sockets[3],this.sockets[2],
                this.sockets[9],this.sockets[14],this.sockets[15],
                this.sockets[16],this.sockets[10]]]
    });
    //LEFT Green face
    this.centers['L'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.B], ignoreOrientation: true}),
      sockets: [[this.sockets[0],this.sockets[7],this.sockets[6],
                this.sockets[11],this.sockets[18],this.sockets[19],
                this.sockets[12],this.sockets[8]]]
    });
    //BACK Orange face
    this.centers['B'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.O], ignoreOrientation: true}),
      sockets: [[this.sockets[2],this.sockets[1],this.sockets[0],
                this.sockets[8],this.sockets[12],this.sockets[13],
                this.sockets[14],this.sockets[9]]]
    });
    //DOWN Yellow face
    this.centers['D'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.Y], ignoreOrientation: true}),
      sockets: [[this.sockets[18],this.sockets[17],this.sockets[16],
                this.sockets[15],this.sockets[14],this.sockets[13],
                this.sockets[12],this.sockets[19]]]
    });
    //Assign pieces to sockets
    //Top layer
    this.sockets[0].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.W, CUBES.Colors.G, CUBES.Colors.O]
    }));
    this.sockets[1].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.O]
    }));
    this.sockets[2].setPiece(new CUBES.Corner({
      colors: [CUBES.Colors.W,CUBES.Colors.O,CUBES.Colors.B]
    }));
    this.sockets[3].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.B]
    }));
    this.sockets[4].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.B,CUBES.Colors.R]
    }));
    this.sockets[5].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W, CUBES.Colors.R]
    }));
    this.sockets[6].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.R,CUBES.Colors.G]
    }));
    this.sockets[7].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.G]
    }));
    //Back face pointing either back or front for edges that are not
    // on U|D, this applies only to the edges on the middle layer 8-11
    this.sockets[8].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.O,CUBES.Colors.G]
    }));
    this.sockets[9].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.O, CUBES.Colors.B]
    }));
    this.sockets[10].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.R, CUBES.Colors.B]
    }));
    this.sockets[11].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.R, CUBES.Colors.G]
    }));
    this.sockets[12].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.O, CUBES.Colors.G]
    }));
    this.sockets[13].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.O]
    }));
    this.sockets[14].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.B, CUBES.Colors.O]
    }));
    this.sockets[15].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.B]
    }));
    this.sockets[16].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.R,CUBES.Colors.B]
    }));
    this.sockets[17].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.R]
    }));
    this.sockets[18].setPiece(new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.G,CUBES.Colors.R]
    }));
    this.sockets[19].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.G]
    }));
  }

  /**
   * Checks if every piece is in the correct socket
   * and oriented.
   * @returns {bool} true if solved, false otherwise.
   */
  isSolved(){
    for (var i = 0; i < this.sockets.length; i++) {
      if(this.sockets[i] == null) continue;
      if(!this.sockets[i].isPositioned()) return false;
      if(!this.sockets[i].isOriented()) return false;
    }
    return true;
  }

  /**
   * Rotate the puzzle executing the given move.
   * Pieces position and orientation is changed accordingly.
   * @param {string} move - The move to execute.
   * Moves are described by the regular expression /(R|L|U|D|F|B)*?/
   * The * indicates a move is counter clockwise
   */
  rotate(move){
    switch (move) {
      //U&D moves change no orientation.
      case 'U':
      case 'U*':
        this.centers['U'].rotate(move === 'U*',0);
        break;
      case 'D':
      case 'D*':
        this.centers['D'].rotate(move === 'D*',0);
        break;
      //F&B moves change all pieces orientation
      case 'F':
      case 'F*':
        this.centers['F'].rotate(move === 'F*',0);
        this.centers['F'].sockets[0].forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientation.rotate(CCW);
          }
          else{//Orient Edges
            currentPiece.orientation.toggle();
          }
        });
        break;
      case 'B':
      case 'B*':
        this.centers['B'].rotate(move === 'B*',0);
        this.centers['B'].sockets[0].forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientation.rotate(CCW);
          }
          else{//Orient Edges
            currentPiece.orientation.toggle();
          }
        });
        break;
      //R&L moves don't change edge orientation.
      case 'R':
      case 'R*':
        this.centers['R'].rotate(move === 'R*',0);
        this.centers['R'].sockets[0].forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientation.rotate(CCW);
          }
        });
        break;
      case 'L':
      case 'L*':
        this.centers['L'].rotate(move === 'L*',0);
        this.centers['L'].sockets[0].forEach(function(elem, index){
          var currentPiece = elem.piece;
          if(currentPiece instanceof CUBES.Corner){ //Orient corners
            // pieces 2 & 6 change orientation counter ClockWise
            var CCW = index == 2 || index == 6;
            currentPiece.orientation.rotate(CCW);
          }
        });
        break;
    }
  }
  /**
   * Initializes the debug render.
   * The debug renderer is not animated
   * nor is it pretty.
   * But it builds the model directly from logical model
   * so it should always be in sync.
   */
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
  /**
   * Positions pieces for the debug renderer.
   * @param {number} size - size of the pieces.
   * @private
   */
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
  /**
   * Positions center pieces for the debug renderer.
   * @param {number} size - size of the pieces.
   * @private
   */
  _positionCenterCubies(size){
    this.centers['U'].cubie.object3D.position.y = size;
    this.centers['D'].cubie.object3D.position.y = -size;

    this.centers['R'].cubie.object3D.position.x = size;
    this.centers['L'].cubie.object3D.position.x = -size;

    this.centers['F'].cubie.object3D.position.z = size;
    this.centers['B'].cubie.object3D.position.z = -size;
  }
  /**
   * Updates the debug renderer.
   * Checks model and recolor pieces accordingly
   */
  updateRenderer(){
    this._recolorSocketCubies()
  }
  /**
   * Recolors each piece according to their orientation.
   * Used by debug renderer.
   * @private
   */
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
               cols.U = piece.colors[piece.orientation.state];
               if (piece instanceof CUBES.Edge){
                var otherIndx = (piece.orientation.state + 1)%piece.orientation.stateCount;
                 if(z == 0) cols.B = piece.colors[otherIndx];
                 if(z == 2) cols.F = piece.colors[otherIndx];
                 if(x == 0) cols.L = piece.colors[otherIndx];
                 if(x == 2) cols.R = piece.colors[otherIndx];
               }
               else{ //corners
                 var CWIndx  = piece.orientation.rotatePeek();
                 var CCWIndx = piece.orientation.rotatePeek(true);
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
                var otherIndx = (piece.orientation.state + 1)%piece.orientation.stateCount;
                if(z == 2){
                  cols.F = piece.colors[piece.orientation.state];
                }
                else{
                  cols.B = piece.colors[piece.orientation.state];
                }
                if(x == 0) cols.L = piece.colors[otherIndx];
                if(x == 2) cols.R = piece.colors[otherIndx];
               break;
             case 0: //Bottom
               cols.D = piece.colors[piece.orientation.state];
               if (piece instanceof CUBES.Edge){
                var otherIndx = (piece.orientation.state + 1)%piece.orientation.stateCount;
                 if(z == 0) cols.B = piece.colors[otherIndx];
                 if(z == 2) cols.F = piece.colors[otherIndx];
                 if(x == 0) cols.L = piece.colors[otherIndx];
                 if(x == 2) cols.R = piece.colors[otherIndx];
               }
               else{ //corners
                 var CWIndx  = piece.orientation.rotatePeek();
                 var CCWIndx = piece.orientation.rotatePeek(true);
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
  /**
   * Return an array of sockets given their names.
   * @param {string[]} names - Array of socket names.
   * @returns {CUBES.Socket[]} Array of sockets.
   */
  getSockets(names){
    var sockets = [];
    var self = this;
    names.forEach(function(name){
      sockets.push(self.getSocket(name));
    });
    return sockets;
  }
  /**
   * Returns the socket matching the given string.
   * Names indicate the faces they belong to.
   * Face order is irrelevant.
   * 'UFR','FRU','UFR' all return the same socket.
   *
   * @param {string} name - Name of the requested socket.
   * @returns {CUBES.Socket} The socket matching the name.
   * undefined if it is not found.
   */
  getSocket(name){
    var faces = name.split('');
    var x,y,z;
    x = y = z = 1;

    if (faces.indexOf('U')!= -1) y = 2;
    else if (faces.indexOf('D')!= -1) y = 0;

    if (faces.indexOf('F')!= -1) z = 2;
    else if (faces.indexOf('B')!= -1) z = 0;

    if (faces.indexOf('R')!= -1) x = 2;
    else if (faces.indexOf('L')!= -1) x = 0;

    switch(faces.length){
      case 1: //Center. Return whole center Object
        return this.centers[faces[0]];
        break;
      case 2://Edge
      case 3://Corner
        var i = CUBES.Cube333.pieceSocketMap[y][z][x];
        return this.sockets[i];
        break;
    }
  }
};

//static vars
/**
 * Maps socket 3D [y][z][x] space to socket index.
 * @static
 * @type {number[][][]}
 */
CUBES.Cube333.pieceSocketMap = [];
// Top layer     Middle layer      Bottom Layer
// [0][1][2]     [ 8][ c][ 9]     [12][13][14]
// [7][c][3]     [ c][  ][ c]     [19][ c][15]
// [6][5][4]     [11][ c][10]     [18][17][16]
CUBES.Cube333.pieceSocketMap[2] = [[0, 1 ,2],
                                   [7,'c',3],
                                   [6, 5 ,4]];
CUBES.Cube333.pieceSocketMap[1] = [[ 8 , 'c' , 9 ],
                                   ['c', null,'c'],
                                   [ 11, 'c' ,10]];
CUBES.Cube333.pieceSocketMap[0] = [[12, 13,14],
                                   [19,'c',15],
                                   [18, 17,16]];
