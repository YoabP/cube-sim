//Common 3x3x3 cubic puzzle
"use strict";
//Visualization of the 333 puzzle.
// Needs a logical model and scene to work.
CUBES.Cube333.View = class View {
  constructor(rubik,scene) {
    this.logic = rubik;
    this.canRotate = true;
    var self = this;
    this.loadModel().then(function(model){
      CUBES.Cube333.View.bind(model,rubik);
      self.object3D = model;
      scene.add(model);
    });
  }
  //Execute an algorithm.
  // algorithm - Algorithm to execute, a string like "R R R* U.
  // ms - miliseconds each move animation will take.
  algorithm(algorithm,ms){
    //patch to format
    algorithm = algorithm.replace(/'/g, '*');
    algorithm = algorithm.replace(/(\w)2/g, '$1 $1');
    var moves = algorithm.split(' ');
    this._algorithmR(moves,ms);
  }
  _algorithmR(moves,ms){
    var self = this;
    ms = ms? ms: 300;
    if(moves.length == 0) return;
    var move = moves.shift();
    self.rotate(move,ms).then(
      function(){
        self._algorithmR(moves,ms);
      });
  }
  rotate(move, ms){
    var self = this;
    var face, CCW;
    ms = ms? ms: 300;
    face = move[0];
    CCW = move[1];
    if(!self.canRotate) return;
    return new Promise(function(resolve, reject){
      var center = self.logic.getSocket(face);
      var obj = center.piece.cubie;
      obj.updateMatrixWorld();
      center.sockets[0].forEach(function(socket, index){
        // remove child from scene and add it to parent
        THREE.SceneUtils.attach( socket.piece.cubie, socket.piece.cubie.parent, obj );
      });
      var rotation,target;
      var axis;
      var direction; //clockwise direction
      switch(face){
        case 'U': case 'D':
          axis='y';
          break;
        case 'F': case 'B':
          axis = 'z';
          break;
        case 'R': case 'L':
          axis = 'x';
          break;
      }
      switch(face){
        case 'U': case 'R' : case 'F':
          direction = -1;
        break;
        case 'D': case 'L' : case 'B':
          direction = 1;
        break;
      }
      rotation = { y : obj.rotation[axis] };
      target = { y: obj.rotation[axis] + Math.toRadians(90)*(CCW? -direction:direction)};

      var tween = new TWEEN.Tween(rotation).to(target, ms);
      tween.onUpdate(function(){
          obj.rotation[axis] = rotation.y;
      });

      self.canRotate = false;
      tween.onComplete(function(){
        var center = self.logic.getSocket(face);
        var obj = center.piece.cubie;
        obj.updateMatrixWorld();
        center.sockets[0].forEach(function(socket, index){
          // remove child from parent and add it to scene
          THREE.SceneUtils.detach( socket.piece.cubie, obj, self.object3D );
        });
        self.logic.rotate(move);
        self.canRotate = true;
        resolve();
      });
      tween.start();
    });
  }

  //Loads the 3D model. Must be called before using view.
  loadModel(){
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) { };
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'models/333/' );
    return new Promise(function(resolve, reject) {
      mtlLoader.load( '333.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/333/' );
        objLoader.load( '333.obj', function ( object ) {
          resolve(object);
        }, onProgress, onError );
      });
    });
  }
}
//Static methods

//Binds a 3D model, with a logical model.
CUBES.Cube333.View.bind = function bind(model, rubik){
  model.children.forEach(function(elem, index){
    rubik.getSocket(elem.name).piece.cubie = elem;
  });
}
