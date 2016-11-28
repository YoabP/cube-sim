"use strict";

/**
 * Square1 puzzle namespace.
 * @namespace
 */
CUBES.Square1 = {};
/**
 * Logical model for a Square1 puzzle.<br>
 * <pre>
 * Face turning, cube puzzle
 * Three levels
 * middle level is 'empty', only has center pieces.
 * top layer: 0-11
 * middle layer: static 'core' and center
 * bottom layer: 12-23
 * Only center layers have orientation.
 * Technically only one center is mobile.
 * Arbitrarily the Right one will be mobile
 * </pre>
 * @class
 */
CUBES.Square1.Model = class Model {
  /**
   * Creates Square1 object.
   */
  constructor() {

    /**
     * Type of puzzle.
     * @type {string}
     */
    this.type = "Square1";
    /**
     * Center pieces for each face (R, U, D).
     * @type {Object.<string, CUBES.Center>}
     */
    this.centers = {};
    /**
     * Array of sockets in this puzzle.
     * @type {CUBES.Socket[]}
     */
    this.sockets = [];
    //Build the puzzle 'space' with sockets.
    for (var i = 0; i < 24; i++) {
      this.sockets[i] = new CUBES.Socket({piece:i});
    }
    // UP White face.
    this.centers['U'] = new CUBES.Center({
      rotationStep: 1,
      piece: new CUBES.Piece({colors:[CUBES.Colors.W], ignoreOrientation: true}),
      sockets: [[this.sockets[0],this.sockets[1],this.sockets[2],
                this.sockets[3],this.sockets[4],this.sockets[5],
                this.sockets[6],this.sockets[7],this.sockets[8],
                this.sockets[9],this.sockets[10],this.sockets[11]]]
    });
    //RIGHT Blue face
    this.centers['R'] = new CUBES.Center({
      rotationStep: 6,
      piece: new CUBES.Piece({colors:[CUBES.Colors.B], ignoreOrientation: false}),
      sockets: [[this.sockets[6],this.sockets[5],this.sockets[4],
                this.sockets[3],this.sockets[2],this.sockets[1],
                this.sockets[13],this.sockets[14],this.sockets[15],
                this.sockets[16],this.sockets[17],this.sockets[18]]]
    });
    //DOWN Yellow face
    this.centers['D'] = new CUBES.Center({
      rotationStep: 2,
      piece: new CUBES.Piece({colors:[CUBES.Colors.Y], ignoreOrientation: true}),
      sockets: [[this.sockets[12],this.sockets[13],this.sockets[14],
                this.sockets[15],this.sockets[16],this.sockets[17],
                this.sockets[18],this.sockets[19],this.sockets[20],
                this.sockets[21],this.sockets[22],this.sockets[23]]]
    });
    var piece;
    //Assign pieces to sockets
    // For the square1, some pieces are on two sockets
    //Top layer
    piece = new CUBES.Corner({
      colors:[CUBES.Colors.W, CUBES.Colors.G, CUBES.Colors.O],
      ignoreOrientation: true
    });
    this.sockets[11].setPiece(piece);
    this.sockets[0].setPiece(piece);

    this.sockets[1].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.O],
      ignoreOrientation:true
    }));
    piece = new CUBES.Corner({
      colors: [CUBES.Colors.W,CUBES.Colors.O,CUBES.Colors.B],
      ignoreOrientation: true
    });
    this.sockets[2].setPiece(piece);
    this.sockets[3].setPiece(piece);

    this.sockets[4].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.B],
      ignoreOrientation: true
    }));
    piece = new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.B,CUBES.Colors.R],
      ignoreOrientation: true
    });
    this.sockets[5].setPiece(piece);
    this.sockets[6].setPiece(piece);

    this.sockets[7].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W, CUBES.Colors.R],
      ignoreOrientation: true
    }));
    piece = new CUBES.Corner({
      colors:[CUBES.Colors.W,CUBES.Colors.R,CUBES.Colors.G],
      ignoreOrientation: true
    });
    this.sockets[8].setPiece(piece);
    this.sockets[9].setPiece(piece);

    this.sockets[10].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.W,CUBES.Colors.G],
      ignoreOrientation: true
    }));
    //Back face pointing either back or front for edges that are not
    // on U|D, this applies only to the edges on the middle layer 8-11

    piece = new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.O, CUBES.Colors.G],
      ignoreOrientation: true
    });
    this.sockets[23].setPiece(piece);
    this.sockets[12].setPiece(piece);

    this.sockets[13].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.O],
      ignoreOrientation: true
    }));

    piece = new CUBES.Corner({
      colors:[CUBES.Colors.Y, CUBES.Colors.B, CUBES.Colors.O],
      ignoreOrientation: true
    });
    this.sockets[14].setPiece(piece);
    this.sockets[15].setPiece(piece);

    this.sockets[16].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y, CUBES.Colors.B],
      ignoreOrientation: true
    }));
    piece = new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.R,CUBES.Colors.B],
      ignoreOrientation: true
    })
    this.sockets[17].setPiece(piece);
    this.sockets[18].setPiece(piece);

    this.sockets[19].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.R],
      ignoreOrientation: true
    }));
    piece = new CUBES.Corner({
      colors:[CUBES.Colors.Y,CUBES.Colors.G,CUBES.Colors.R],
      ignoreOrientation: true
    });
    this.sockets[20].setPiece(piece);
    this.sockets[21].setPiece(piece);

    this.sockets[22].setPiece(new CUBES.Edge({
      colors:[CUBES.Colors.Y,CUBES.Colors.G],
      ignoreOrientation: true
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
    for (var center in this.centers) {
      if (this.centers.hasOwnProperty(center)) {
        if(!this.centers[center].piece.isOriented()) return false;
      }
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
      //R move is the middle slice, check for restriction
      case 'R':
      case 'R*':
        if(!this.checkRestriction()) return;
        this.centers['R'].rotate(move === 'R*',0);
        break;
    }
  }

  /**
   * Check if there is not a piece preventing movement.
   * @return {bool}  - true if move is allowed, false otherwise.
   */
  checkRestriction(){
    if (this.sockets[0].piece == this.sockets[1].piece) return false;
    if (this.sockets[7].piece == this.sockets[6].piece) return false;
    if (this.sockets[18].piece == this.sockets[19].piece) return false;
    if (this.sockets[12].piece == this.sockets[13].piece) return false;
    return true;
  }
  /**
   * Initializes the debug render.
   * The debug renderer is not animated
   * nor is it pretty.
   * But it builds the model directly from logical model
   * so it should always be in sync.
   */
  initRenderer(){
  }
  /**
   * Positions pieces for the debug renderer.
   * @param {number} size - size of the pieces.
   * @private
   */
  _positionSocketCubies(size){
  }
  /**
   * Positions center pieces for the debug renderer.
   * @param {number} size - size of the pieces.
   * @private
   */
  _positionCenterCubies(size){
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
        var i = CUBES.Square1.pieceSocketMap[y][z][x];
        return this.sockets[i];
        break;
      case 4://Corner, but has number 0|1, to identify wich socket
        var offset= faces[3];
        var i = CUBES.Square1.pieceSocketMap[y][z][x][offset];
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
CUBES.Square1.pieceSocketMap = [];
// Corner pieces are divided in two sockets
CUBES.Square1.pieceSocketMap[2] = [[[11,0], 1 ,[2,3]],
                                   [  10  ,'c',  4  ],
                                   [[9,8] , 7 ,[6,5]]];
CUBES.Square1.pieceSocketMap[1] = [[ null, null, null ],
                                   [ null, null,  'c'],
                                   [ null, null, null]];
CUBES.Square1.pieceSocketMap[0] = [[[23,12], 13, [14,15]],
                                   [22     ,'c',   16   ],
                                   [[21,20], 19, [18,17]]];
